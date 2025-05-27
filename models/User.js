const mongoose = require('mongoose') //require mongoose 

const userDataSchema = new mongoose.Schema({   //userSchema set up per mongoose docs, used to set up data format
    name: String,
    job: String,
    company: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'loginData',
        required: true
    },

    
},
{
  timestamps: true
})

const UserData = mongoose.model('UserData', userDataSchema)   //creating instance of model data

module.exports = UserData   //exporting for public use