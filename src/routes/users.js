const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersController')
const {uploadMulter} = require('../middlewares/upload')
router
  .get('/', UsersController.view)
  .post('/',uploadMulter.single('image'), UsersController.insert)
  .get('/:id', UsersController.detail)
  .patch('/:id', UsersController.update)
  .delete('/:id', UsersController.delete)
module.exports = router
