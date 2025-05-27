//let { userData } = require("./userData.js")

//const { Name, Job, Company } = req.body;

const { User } = require('/Users/edwardmarquettewilhite/Desktop/Job App/models/User.js')


const getData = async (req, res) => {
try{
  const users = await User.find({});
  res.status(200).json(users)
}catch (error) {
  res.status(500).json({ msg: 'Server error' });
}
}


//async code so app doesnt freeze when user makes request 
const postData = async (req, res) => {
  console.log(req.body)
  try{
    const {name, job, company} = req.body

   // pull out the object bc it is not just array
    const task = await User.create(name, job, company); // create using that object
console.log('yes')
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