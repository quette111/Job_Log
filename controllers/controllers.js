//let { userData } = require("./userData.js")

//const { Name, Job, Company } = req.body;

const { User } = require('/Users/edwardmarquettewilhite/Desktop/Job App/models/User.js')


const getData = (req, res) => {
res.send(userData)
}

const postData = async (req, res) => {
    const firstItem = req.body[0]; // pull out the object
    const task = await User.create(firstItem); // create using that object
    res.status(201).json({ task });
  };
  

const putData = (req, res) => {

}

const deleteData = (req, res) => {

}

module.exports = {getData, postData, putData, deleteData}