const mongoose = require('mongoose') //require mongoose applicationStatus, job, company, apiUrl, jobId, formattedDate

const modalDataSchema = new mongoose.Schema({   //userSchema set up per mongoose docs, used to set up data format
  
    connectedOnLI:{ 
        type: Boolean,
        require: false,
       
    },
    inquire:{
        type: Boolean,
        require: false,
       
    },
    emailFollowUp:{
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

const modalData = mongoose.model('modalData', modalDataSchema)   //creating instance of model data

module.exports = modalData   //exporting for public use

