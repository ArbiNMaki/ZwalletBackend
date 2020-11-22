const { throws } = require('assert')
const modelProducts = require('../models/products')
const products = {
  getProducts: (req, res) => {
    modelProducts.getProduct()
      .then(result => {
        const resultProdcut = result
        res.json(resultProdcut)
      })
      .catch((err) => {
        res.status(400).json({
          message: 'data error'
        })
      })
  },
  detailProducts: (req, res) => {
    const id = req.params.id
    modelProducts.getProductById(id)
      .then(result => {
        const resultProdcut = result
        res.json(resultProdcut)
      })
      .catch((err) => {
        res.status(400).json({
          message: 'data error'
        })
      })
  },
  insertProduct: (req, res) => {
    const { name, price, amount } = req.body

    const data = {
      name,
      price,
      amount,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    modelProducts.insertProduct(data)
      .then(result => {
        const resultProdcut = result
        res.json(resultProdcut)
      })
      .catch((err) => {
        res.status(400).json({
          message: 'data error'
        })
      })
  },
  updateProduct: (req, res) => {
    let data = req.body
    const { id } = req.params

    // const data = {
    //     name,
    //     price,
    //     amount,
    //     updatedAt: new Date()
    // }
    data = JSON.parse(JSON.stringify(data))
    data.updatedAt = new Date()
    modelProducts.updateProduct(id, data)
      .then(result => {
        const resultProdcut = result
        res.json(resultProdcut)
      })
      .catch((err) => {
        res.status(400).json({
          message: 'data error'
        })
      })
  },
  deleteProduct: (req, res) => {
    const { id } = req.params
    modelProducts.deleteProduct(id)
      .then(result => {
        const resultProdcut = result
        res.json(resultProdcut)
      })
      .catch((err) => {
        res.status(400).json({
          message: 'data error'
        })
      })
  }
}

module.exports = products
