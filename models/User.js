const mongoose = require('mongoose') //require mongoose applicationStatus, job, company, apiUrl, jobId, formattedDate

const userDataSchema = new mongoose.Schema({   //userSchema set up per mongoose docs, used to set up data format
    applicationStatus:{
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
     apiUrl:{
      type:String,
      require:[true, 'External API URL needs to be sent front client'],
    },
     jobId:{
      type:String,
      require:[false, 'data ID needs to be sent front client'],
    },
    formattedDate:{
      type:String,
      require:[true, 'date needs to be sent front client'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'loginData',
        require: true
    },

},
{
  timestamps: true
})

const UserData = mongoose.model('UserData', userDataSchema)   //creating instance of model data

module.exports = UserData   //exporting for public use
