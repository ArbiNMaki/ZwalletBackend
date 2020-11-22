const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersController')
router
  .get('/', UsersController.view)
  .post('/', UsersController.insert)
  .get('/:id', UsersController.detail)
  .patch('/:id', UsersController.update)
  .delete('/:id', UsersController.delete)
module.exports = router
