const mongoose = require('mongoose') //require mongoose 

const userSchema = new mongoose.Schema({   //userSchema set up per mongoose docs, used to set up data format
    name: String,
    job: String,
    company: String,
})

const User = mongoose.model('userData', userSchema)   //creating instance of model data

module.exports = { User }  //exporting for public use