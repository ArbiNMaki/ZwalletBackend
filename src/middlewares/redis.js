const redis = require("redis")
const { response } = require("../helpers/helpers")
const client = redis.createClient(6379)

exports.cacheAllUser = (req, res, next) => {
    client.get("getAllUser", function (err, data) {
        console.log(err)
        const result = JSON.parse(data)
        if (data !== result) {
            return response('success', res, result, 200, null)
        } else {
            next()
        }
    })
}
exports.deleteCacheAllUser = (req, res, next) => {
    client.get("getAllUser")
    next()
}

exports.getDetailUser = (req, res, next) => {
    const id = req.params.id
    client.get("user"+id, function (err, data) {
        const result = JSON.parse(data)
        if (data !== result) {
            return response('success', res, result, 200, null)
        } else {
            next()
        }
    })
}