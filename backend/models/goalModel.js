const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    goal: {
        type: String,
        required: [true, 'Please add a goal']
    }
}, {
    timeStamps: true //will autocreate
})

module.exports = mongoose.model('Goal', goalSchema)