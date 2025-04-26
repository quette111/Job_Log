//let { userData } = require("./userData.js")

//const { Name, Job, Company } = req.body;

const { User } = require('/Users/edwardmarquettewilhite/Desktop/Job App/models/User.js')


const getData = (req, res) => {
res.send(userData)
}

//async code so app doesnt freeze when user makes request 
const postData = async (req, res) => {
  try{
    const firstItem = req.body; // pull out the object bc it is not just array
    const task = await User.create(firstItem); // create using that object
    res.status(201).json(task)
  } catch(error){
    console.log('Error', error)
  }
    
    //res.status(201).json({ task });
  };
  

const deleteDB = async(req, res) => {
  try{
 const del = await User.findByIdAndDelete(req.params.id)
 res.status(201).json(del)
  } catch(error){
    console.log('Error', error)
  }

}



module.exports = {getData, postData, deleteDB}