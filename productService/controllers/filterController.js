const productModel = require('../models/productModel');

const categoryFilter  = async (req, res) =>{
    // console.log(req.params);
    const {category} = req.body
    const filteredProducts = await productModel.find({category: category})
    res.json({filteredProducts})
}

const priceFilter = async (req, res) =>{ 
    const {price} = req.body
    const filteredProducts = await productModel.find({ price: {$lte: price}})

    res.json(filteredProducts)
}

const  categorypriceFilter = async (req, res) =>{
    const {category,price} = req.body
    const filteredProducts = await productModel.find({category: category, price: {$lte: price}})
    res.json(filteredProducts)
}

module.exports = {
    categoryFilter,
    priceFilter,
    categorypriceFilter
}