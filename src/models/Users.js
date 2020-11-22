const connection = require('../configs/db')

const users = {
  viewUsers: (search, limit, offset) => {
    return new Promise((resolve, reject) => {
      if (search) {
        connection.query(`SELECT * FROM users WHERE CONCAT(name,' ', phone) LIKE '%${search}%'`, (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      } else if (limit && offset) {
        connection.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query('SELECT * FROM users', (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      }
    })
  },
  insertUsers: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, results) => {
        if (!error) {
          connection.query('SELECT * FROM users WHERE id = ?', results.insertId, (error2, results2) => {
            resolve({
              status: 200,
              message: 'Data Berhasil Diinputkan',
              data: results2
            })
          })
        } else {
          reject(error)
        }
      })
    })
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ?  WHERE id = ?', [data, id], (error, results) => {
        if (!error) {
          connection.query('SELECT * FROM users WHERE id = ?', id, (error2, results2) => {
            resolve({
              status: 200,
              message: 'Data Berhasil Diupdate',
              data: results2
            })
          })
        } else {
          reject(error)
        }
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}

module.exports = users
