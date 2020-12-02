const { throws } = require('assert')
const modelUsers = require('../models/Users')
const helper = require('../helpers/helpers')
const Users = {
  view: (req, res) => {
    const search = req.query.search || ' '
    const limit = req.query.limit || 4
    const offset = (req.query.page-1) * limit
    modelUsers.viewUsers(search, limit, offset)
    .then(result => {
      const resultUser = result
      res.json(resultUser)
    })
    .catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
   let data = req.body
   data = JSON.parse(JSON.stringify(data))
   data.image = `${process.env.BASE_URL}/uploads/${req.file.filename}`
   data.createdAt= new Date()
   data.updatedAt= new Date()
   modelUsers.insertUsers(data)
   .then(result => {
    const resultUsers = result
    res.json(resultUsers)
  })
   .catch((err) => {
    helper.response('error', res, null, 200, err.sqlMessage)
  })
 },
 detail: (req, res, next) => {
  const id = req.params.id
  modelUsers.getUserById(id)
  .then(result => {
    const resultUser = result
    if (resultUser.length === 0) {
      const error = new Error('Data Param or Patch Not Failed')
      error.status = 404
      error.statusCek = 'error'
      return next(error)
    }
    res.json(resultUser)
  })
  .catch((err) => {
    res.status(400).json({
      message: 'data error'
    })
  })
},

update: (req, res) => {
  let data = req.body
  const { id } = req.params
  data = JSON.parse(JSON.stringify(data))
  data.updatedAt = new Date()
  modelUsers.updateUser(id, data)
  .then(result => {
    const resultUser = result
    res.json(resultUser)
  })
  .catch((err) => {
    helper.response('error', res, null, 200, err.sqlMessage)
  })
},

delete: (req, res, next) => {
  const id = req.params.id
  modelUsers.deleteUser(id)
  .then(result => {
    const resultUser = result
    console.log(resultUser)
    if (resultUser.affectedRows === 0) {
      const error = new Error('Data Param or Patch Not Failed')
      error.status = 404
      error.statusCek = 'error'
      return next(error)
    }
    res.json(resultUser)
  })
  .catch((err) => {
    res.status(400).json({
      message: 'data error'
    })
  })
}
}

module.exports = Users
