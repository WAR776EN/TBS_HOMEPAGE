// libs
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { name, password } = req.body
        const { recipient } = req
        let user = await User.create({
            email: recipient,
            role: 'student',
            password,
            name
        })
        req.user = user
        next()
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
}