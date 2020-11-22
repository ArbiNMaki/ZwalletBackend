const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')
router
  .get('/', transactionController.view)
  .post('/', transactionController.insert)
  .get('/:id', transactionController.detail)
  .patch('/:id', transactionController.update)
  .delete('/:id', transactionController.delete)
module.exports = router
