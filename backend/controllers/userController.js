const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    //check to see if user already exists
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPW = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name, 
        email, 
        password:hashedPW
    })
    if(user) {
        res.status(200).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    } else {
        //if the input does not match the requirements of the model
        res.status(400)
        throw new Error('Invalid user data')
    }
}) 

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //Check for user email in database
    const user = await User.findOne({email})
    //Check password is the same, new input first, and then saved hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id, //why does this not have an underscore?
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data - will get user data from the token in order to find all data in the database
// @route GET /api/users/me
// @access Private, has access to req.user
const getMe = asyncHandler(async(req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

//generate Token function (data we want a token created from, the secret to create the token)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}