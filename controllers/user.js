require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body
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

exports.login = async (req, res, next) => {
    try {
        await loginValidation(req.body)
        let registeredUser = await User.findOne({ email: req.body.email }, '_id name email password role')
        if (!registeredUser) throw new AuthenticationError(`${req.body.email} is not registered`)
        const isPasswordTrue = await bcrypt.compareSync(req.body.password, registeredUser.password)
        const payload = {
            _id: registeredUser._id,
            role: registeredUser.role,
            name: registeredUser.name
        }
        const token = jwt.sign({ payload }, process.env.SECRET_KEY)
        if (!isPasswordTrue) throw new AuthenticationError(`Wrong Password!`)

        return res.status(201).json({
            success: true,
            message: `authenticated! welcome, ${registeredUser.name}`,
            data: { registeredUser, token }
        })
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
}

exports.profile = async (req, res, next) => {
    try {
        let user = req.user
        let result = await User.findOne({ _id: user._id }, '-password -__v')
        return res.status(201).json({
            success: true,
            message: 'Logged in',
            data: result
        })
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const user = req.user
        const filter = { _id: user._id }
        const dataUpdate = req.body

        let options = {}
        options.new = true
        options.fields = { email: 1, name: 1, role: 1 }

        const result = await User.findOneAndUpdate(filter, dataUpdate, options)
        return res.status(200).json({
            success: true,
            message: `user data is updated`,
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}