const jwt = require('jsonwebtoken');

module.exports = {
    genToken: function(user) {
        const jwtPayload = {
            subject: user.id,
            username: user.user_name,
            name: user.name
        }
        const secret = require('./secret.js').jwtSecret
        const options = {
            expiresIn: '7d'
        }
        return jwt.sign(jwtPayload, secret, options)
    },
}