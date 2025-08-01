import mongoose from 'mongoose';

const userDataSchema = new mongoose.Schema({   //userSchema set up per mongoose docs, used to set up data format
    applicationStatus:{
    type:String,
    enum: ['Applied', 'Interested', 'Interview', 'Rejected', 'Closed', 'Assessment'],
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
      require:[true, 'data ID needs to be sent front client'],
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
     connectedOnLI:{ 
        type: String,
        enum: ['checked', 'unchecked'],
        require: false,
       
    },
    inquire:{
        type: String,
        enum: ['checked', 'unchecked'],
        require: false,
       
    },
    emailFollowUp:{
        type: String,
        enum: ['checked', 'unchecked'], 
        require: false,
       
    },
    salary:{
        type: Number,
        require: false,
        min: 0,
        max:500000
       
    },
    callAI:{
        type: String,
        require: false,
   
    },

},
{
  timestamps: true
})

const UserData = mongoose.model('UserData', userDataSchema)   //creating instance of model data

export default UserData;

