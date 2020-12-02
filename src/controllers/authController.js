const bcrypt = require('bcryptjs')
const helper = require('../helpers/helpers')
const {cekUser} = require('../models/auth')
exports.registerUser = (req, res) => {
	const {username,email,password } = req.body
	cekUser(email)
	.then((result)=>{
		if(result.length > 0){
			helper.response('error', res, null, 401, {error : 'email sudah digunakan'})
		}
	})

	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        return res.json(salt)
    });
});
}
