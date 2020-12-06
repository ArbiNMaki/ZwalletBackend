const { throws } = require('assert')
const bcrypt = require('bcryptjs')
const { cekUser } = require('../models/auth')
const helper = require('../helpers/helpers')
var jwt = require('jsonwebtoken')
const {sendEmail} = require('../helpers/email')
exports.loginUser = (req, res) => {
        const { email, password } = req.body
        cekUser(email)
                .then((result) => {
                        const user = result[0]
                        bcrypt.compare(password, user.password, function (err, resCek) {
                                if (!resCek) {
                                        return helper.response('error', res, null, 401, 'password wrong')
                                } else {
                                        delete user.password
                                        jwt.sign({ userId: user.id, role:user.role }, process.env.SECRET_KEY, { expiresIn: '1h' }, function (err, token) {
                                                user.token = token
                                                return helper.response('success', res, user, 200, 'login success')
                                        })
                                }
                        })
                })
                .catch((err) => {
                        helper.response('error', res, null, 401, 'email is not specified')
                })
}

exports.sendEmail = (req, res) => {
const email = req.body.email
const title = req.body.title
const message = req.body.message
sendEmail(email,title,message)
.then((result) => {
        helper.response('success', res, {id : res.messageId}, 200, 'Email Sent Successfully')
})
.catch((err) => {
        helper.response('error', res, null, 500, 'error send email')
})
}
