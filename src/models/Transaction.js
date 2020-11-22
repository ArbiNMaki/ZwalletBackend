const connection = require('../configs/db')

const Transaction = {
  viewAll: (sort) => {
    return new Promise((resolve, reject) => {
      if (sort) {
        connection.query(`SELECT trans.id as id_trasaksi,trans.amount, u.name as nama_pengirim, us.name as nama_penerima,trans.date,trans.notes,trans.createdAt FROM transaction trans INNER JOIN users u ON (u.id = trans.id_user_sender) INNER JOIN users us ON (us.id =trans.id_user_receiver) ORDER BY trans.id ${sort}`, (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      } else {
        connection.query('SELECT trans.id as id_trasaksi,trans.amount, u.name as nama_pengirim, us.name as nama_penerima,trans.date,trans.notes,trans.createdAt FROM transaction trans INNER JOIN users u ON (u.id = trans.id_user_sender) INNER JOIN users us ON (us.id =trans.id_user_receiver)', (error, results) => {
          if (!error) {
            resolve(results)
          } else {
            reject(error)
          }
        })
      }
    })
  },
  insertTransaction: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO transaction SET ?', data, (error, results) => {
        if (!error) {
          connection.query('SELECT * FROM transaction WHERE id = ?', results.insertId, (error2, results2) => {
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
  getTransactionById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT trans.id as id_trasaksi,trans.amount, u.name as nama_pengirim, us.name as nama_penerima,trans.date,trans.notes,trans.createdAt FROM transaction trans INNER JOIN users u ON (u.id = trans.id_user_sender) INNER JOIN users us ON (us.id =trans.id_user_receiver) WHERE trans.id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  },

  updateTransaction: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE transaction SET ?  WHERE id = ?', [data, id], (error, results) => {
        if (!error) {
          connection.query('SELECT trans.id as id_trasaksi,trans.amount, u.name as nama_pengirim, us.name as nama_penerima,trans.date,trans.notes,trans.createdAt FROM transaction trans INNER JOIN users u ON (u.id = trans.id_user_sender) INNER JOIN users us ON (us.id =trans.id_user_receiver) WHERE trans.id = ?', id, (error2, results2) => {
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

  deleteTransaction: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM transaction WHERE id = ?', id, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      })
    })
  }
}
module.exports = Transaction
