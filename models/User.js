const mongoose = require('mongoose') //require mongoose 

const userSchema = new mongoose.Schema({   //userSchema set up per mongoose docs, used to set up data format
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

const User = mongoose.model('User', userSchema)   //creating instance of model data

module.exports = { User }  //exporting for public use