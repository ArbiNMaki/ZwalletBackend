const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
router
  .get('/', productController.getProducts)
  .get('/:id', productController.detailProducts)
  .post('/', productController.insertProduct)
  .patch('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)
module.exports = router
