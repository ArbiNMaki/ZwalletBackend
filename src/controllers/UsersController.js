const { throws } = require('assert')
const modelUsers = require('../models/Users')
const bcrypt = require('bcryptjs')
const helper = require('../helpers/helpers')
const { cekUser } = require('../models/auth')
var multer = require('multer')
const redis = require("redis")
const client = redis.createClient(6379)
const Users = {
  view: (req, res) => {
    const search = req.query.search || ' '
    const limit = req.query.limit || 4
    const offset = (req.query.page - 1) * limit
    modelUsers.viewUsers(search, limit, offset)
      .then(result => {
        const resultUser = result
        client.setex("getAllUser",60*60,JSON.stringify(resultUser))
        res.json(resultUser)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  insert: (req, res) => {
    let data = req.body
    data = JSON.parse(JSON.stringify(data))
    //  validasi


    cekUser(data.email)
      .then((result) => {
        if (result.length > 0) {
          return helper.response('error', res, null, 401, { error: 'email is already in use' })
        }
        else if (!req.file) {
          data.image = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
        }
        else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
          return helper.response('error', res, null, 401, 'Only .png, .jpg and .jpeg format allowed!')
          }
          else if (req.file.size >= 8388608) {
            return helper.response('error', res, null, 401, 'Image size is too large, it must be under 8MB')
          } 
          else{
            data.image = `${process.env.BASE_URL}/uploads/${req.file.filename}`
          }
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(data.password, salt, function (err, hash) {
            data.password = hash
            data.createdAt = new Date()
            data.updatedAt = new Date()
            modelUsers.insertUsers(data)
              .then(result => {
                const resultUsers = result
                res.json(resultUsers)
              })
              .catch((err) => {
                helper.response('error', res, null, 200, err.sqlMessage)
              })
          })
        })
      })
    // end validasi

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
        client.setex("user"+id,60*60,JSON.stringify(resultUser))
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
    if (!req.file) {
      data.updatedAt = new Date()
    }
    else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
     return helper.response('error', res, null, 401, 'Only .png, .jpg and .jpeg format allowed!')
    }
    else if (req.file.size >= 8388608) {
      return helper.response('error', res, null, 401, 'Image size is too large, it must be under 8MB')
    }else {
      data.image = `${process.env.BASE_URL}/uploads/${req.file.filename}`
      data.updatedAt = new Date()
    }
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
    const userData = req.users
    // console.log(userData.userId)
    if (id == userData.userId) {
     return helper.response('error', res, null, 200, 'cannot delete your id')
    } else if (userData.role === 'user') {
      return helper.response('error', res, null, 401, 'you are not admin, data cannot be deleted')
    }
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
          helper.response('success', res, null, 200, `id ${id} deleted successfully`)
        })
        .catch((err) => {
          res.status(400).json({
            message: 'data error'
          })
        })
  }
}

module.exports = Users
