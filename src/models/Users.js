const connection = require('../configs/db')
const fs = require('fs')
const users = {
  viewUsers: (search, limit, offset) => {
    return new Promise((resolve, reject) => {
      if (search && limit && offset >= 0) {
        connection.query(`SELECT * FROM users WHERE ( NOT id= 1 AND CONCAT(name,' ', phone) LIKE '%${search}%') LIMIT ${limit} OFFSET ${offset}`, (error, results) => {
          if (!error) {
            connection.query(`SELECT COUNT(id) FROM users WHERE NOT id= 1 AND CONCAT(name,' ', phone) LIKE '%${search}%'`, (error2, results2) => {
              resolve({
                status: 200,
                rows: results2[0]['COUNT(id)'],
                data: results
              })
            })
          } else {
            reject(error)
          }
        })
      }
      else {
        connection.query('SELECT * FROM users WHERE NOT id= 1', (error, results) => {
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
            if ( results.affectedRows === 0) {
              resolve({
              status: 401,
              message: 'Id Not Found'
            })
            }
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
  deleteImage: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT image FROM users WHERE id = ?', id, (error, results) => {
        if (!error) {
          if(results[0].image !== 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'){
            const images = results[0].image.split('/')[4]
            const path = `uploads/${images}`
            fs.unlink(path, (err) => {
              if (err) {
                resolve({message: err})
              }
              else{
                resolve({message: 'Gambar Berhasil Dihapus'})
              }
            })
          }
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
