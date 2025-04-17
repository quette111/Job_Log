const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: false,
    },
    job: {
        type: String,
        required: true, 
        trim: false,
    },
    company: {
        type: String,
        required: true, 
        trim: false,
    },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }