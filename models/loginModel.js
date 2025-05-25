const mongoose = require('mongoose') //require mongoose 

const userSchema = new mongoose.Schema({   //userSchema set up per mongoose docs, used to set up data format
    first: String,
    last: String,
    email: String,
    password: String
})






const loginUser = mongoose.model('loginData', userSchema)   //creating instance of model data

module.exports = { loginUser }  //exporting for public use