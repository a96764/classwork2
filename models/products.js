const Product = require('../models/product')
exports.getAll = async function(req, res) {
let products = await Product.find()
res.json({data: products})
}