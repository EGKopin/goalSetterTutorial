const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //when we have our _id field that is autocreated, it is called an ObjectId
        required: true,
        ref: 'User', //this is how we know the ObjectId is from the User schema
    },
    goal: {
        type: String,
        required: [true, 'Please add a goal']
    }
}, 
    {
        timeStamps: true //will autocreate
    })

module.exports = mongoose.model('Goal', goalSchema)