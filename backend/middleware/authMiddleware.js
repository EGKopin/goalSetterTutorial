const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//checking for token which is in header. It will be automatically be in the Authorization headers as a Bearer token
const protect = asyncHandler(async(req, res, next) => {
    let token; 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header, removing the word bearer by turning it into an array
            token = req.headers.authorization.split(' ')[1]

            //Verify token and decode to use
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token, because the token has the userID as the payload, and put on req.user so it can be used from all protected routes
            req.user = await User.findById(decoded.id).select('-password') //this id was set in the token in the userController.js; anything could have been put in there too, ie username
                //-password will remove the password from the returned data

            next()
        } catch (error) {
            console.log(error)
            res.status(401) //401 is not authorized
            throw new Error ('Not authorized')
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }