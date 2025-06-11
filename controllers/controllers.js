//let { userData } = require("./userData.js")

//const { Name, Job, Company } = req.body;

const UserData = require('../models/User')

/*
const getData = async (req, res) => {
try{
  const users = await UserData.find({});
  res.status(200).json(users)
}catch (error) {
  res.status(500).json({ msg: 'Server error' });
}
}

*/
//async code so app doesnt freeze when user makes request 
const postData = async (req, res) => {


 const {name, job, company, connectedOnLI, inquire, salary} = req.body

  if(!name || !job || !company){
    return res.status(401).json({error: "error bro"})
   }

   try{
   // pull out the object bc it is not just array
    const task = await UserData.create({name, job, company, connectedOnLI, inquire, salary, createdBy: req.user.userId}); // create using that object

    res.status(201).json({task})
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
   const {name} = req.body

  try{
    console.log('hello')
    const edit = await UserData.findOneAndUpdate({_id: req.params.id}, {name}, {new: true},  { runValidators: true })
    res.status(201).json(edit)
  } catch(error){
    console.log(error)
  }
}

const editAllData = async (req, res) => {
   const {name, job, company} = req.body

  try{
    console.log('hello')
    const edit = await UserData.findOneAndUpdate({_id: req.params.id}, {name, job, company}, {new: true},  { runValidators: true })
    res.status(201).json(edit)
  } catch(error){
    console.log(error)
  }
}

const fetchUserData = async (req, res) => {
  //const {name} = req.body

  try{
    const userStatusData = await UserData.find({})
    res.status(201).json(userStatusData)
  } catch(error){
    console.log(error)
  }
}

module.exports = { postData, deleteDB, editData, fetchUserData}