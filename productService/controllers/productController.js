const express = require('express');
const productModel = require('../models/productModel');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getProductByName = async (req, res) => {
    try {
        const product = await productModel.find({ name: req.params.name });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getProductById = async (req, res) => {
    try {
        const productDetails = await productModel.findById(req.params.id);
        res.json(productDetails);
    } catch (error) {
        res.status(400).json(error);
    }
};


const findProduct = async (req, res) => {
  try {
    const { idOrName } = req.body;

    let products;

    if (mongoose.Types.ObjectId.isValid(idOrName)) {
      const product = await productModel.findById(idOrName);
      products = product ? [product] : [];
    } else {
      products = await productModel.find({name: { $regex: idOrName, $options: 'i' }
      });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error finding product:', error);
    res.status(400).json({ message: 'Query error', error });
  }
};


const createProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    getProducts,
    createProduct,
    findProduct
};
