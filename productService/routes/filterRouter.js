const express = require('express');
const router = express.Router();
const {categoryFilter,priceFilter, categorypriceFilter} = require("../controllers/filterController")

router.post("/category", categoryFilter)
router.post("/price", priceFilter)
router.post("/categoryprice",  categorypriceFilter)


module.exports = router