const mongoose = require('mongoose') //require mongoose 

const userDataSchema = new mongoose.Schema({   //userSchema set up per mongoose docs, used to set up data format
    name:{
    type:String,
    require:[true, 'Please status of application'],
    },
    job:{
      type:String,
        require:[true, 'Please job title'],
    },
    company:{
      type:String,
      require:[true, 'Please company name'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'loginData',
        require: true
    },
     connectedOnLI:{
        type: Boolean,
        require: false,
       
    },
    inquire:{
        type: Boolean,
        require: false,
       
    },
    salary:{
        type: Number,
        require: false,
        min: 0,
        max:500000
       
    },

},
{
  timestamps: true
})

const UserData = mongoose.model('UserData', userDataSchema)   //creating instance of model data

module.exports = UserData   //exporting for public use