const loginUser = require('../models/loginModel')
const {StatusCodes} = require('http-status-codes')

const postUserData = async (req, res) => {
 
    const {first, last, email, password} = req.body; // pull out the object bc it is not just array
    if(!first || !last || !email || !password){
      return res.status(400).json({ error: "Missing required fields...."})
    } 
    
    try{
    const task = await loginUser.create({first, last, email, password}); // create using that object
  
      
res.status(StatusCodes.CREATED).json({user: { name: `${task.first} ${task.last}` }})

  } catch(error){
    console.log('Error', error)
  }
  }


  const loginTheUser = async (req, res) => {

    console.log('controller hit')

    const {email, password} = req.body
console.log(password)

    if(!email, !password){
            return res.status(400).json({ error: "Missing required fields...."})

    }

    try{

      const user = await loginUser.findOne({email})

      if(!user){
              return res.status(400).json({ error: "Incorrect email...."})

      }

     const isPasswordCorrect = await user.comparePassword(password)
console.log(isPasswordCorrect)
    if(!isPasswordCorrect){

      return res.status(400).json({ error: "Incorrect password...."})

    }

    const token = user.createJWT()
res.status(StatusCodes.OK).json({user: { name: `${email}` }, token})

    } catch (error){
      console.log('Error', error)
    }

  }

  module.exports = {postUserData, loginTheUser}
  