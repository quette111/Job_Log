//let { userData } = require("./userData.js")

//const { Name, Job, Company } = req.body;

const UserData = require('../models/User')
const modalData = require('../models/modalDataModel')
const loginUserData = require('../models/User')


const postModalData = async (req, res) => {
console.log('attempting Modal DB write')

  console.log('req.user:', req.user);
 const {connectedOnLI, inquire, emailFollowUp, salary} = req.body

 

   try{
   // pull out the object bc it is not just array
    const task = await modalData.create({ connectedOnLI, inquire, salary, emailFollowUp, createdBy: req.user.userId}); // create using that object

    res.status(201).json({task})
    console.log(' writing DB')
  } catch(error){
    console.log('Error', error)
  }
    
  };



const postData = async (req, res) => {
console.log('attempting DB write')
 console.log('IN POST DATA');
  console.log('req.user:', req.user);
 const {applicationStatus, job, company, apiUrl, formattedDate,jobId, connectedOnLI, inquire, salary, emailFollowUp } = req.body

  if(!applicationStatus || !job || !company){
    return res.status(401).json({error: "error bro"})
   }

   try{
   // pull out the object bc it is not just array
    const task = await UserData.create({applicationStatus, job, company, apiUrl, jobId, connectedOnLI, inquire, salary, emailFollowUp, formattedDate, createdBy: req.user.userId}); // create using that object

    res.status(201).json({task})
    console.log(' writing DB')
  } catch(error){
    console.log('Error', error)
  }
    
    //res.status(201).json({ task });
  };
  

const deleteDB = async(req, res) => {
  try{

 const del = await UserData.findByIdAndDelete(req.params.id)
 res.status(201).json(del)
  } catch(error){
    console.log('Error', error)
  }

}

const editData = async (req, res) => {
   const {applicationStatus} = req.body

  try{
    console.log('hello')
    const edit = await UserData.findOneAndUpdate({_id: req.params.id}, {applicationStatus}, {new: true},  { runValidators: true })
    res.status(201).json(edit)
  } catch(error){
    console.log(error)
  }
}

const modalInputDataPatch = async (req, res) => {
   const {connectedOnLI, inquire, salary, emailFollowUp} = req.body

  try{
    console.log('hello')
    const modalData = await UserData.findOneAndUpdate({_id: req.params.id}, {connectedOnLI, inquire, salary, emailFollowUp}, {new: true},  { runValidators: true })
    res.status(201).json(modalData)
  } catch(error){
    console.log(error)
  }
}

const editAllData = async (req, res) => {
   const {applicationStatus, job, company} = req.body

  try{
    console.log('hello')
    const edit = await UserData.findOneAndUpdate({_id: req.params.id}, {applicationStatus, job, company}, {new: true},  { runValidators: true })
    res.status(201).json(edit)
  } catch(error){
    console.log(error)
  }
}

const fetchUserData = async (req, res) => {
  try {
    console.log('lol')
    console.log('req.userId is:', req.userId)
   console.log('Cookies receivedNIGGA:', req.cookies);

       const entries = await UserData.find({ createdBy: req.user.userId }).lean();
console.log('bribri', req.user.userId)

    if (!entries) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, entries });
    console.log('fething user data')
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};




module.exports = { postData, deleteDB, editData, fetchUserData, modalInputDataPatch}