const {loginUser} = require('../models/loginModel')

const postUserData = async (req, res) => {
 
    const {first, last, email, password} = req.body; // pull out the object bc it is not just array
    if(!first || !last || !email || !password){
      return res.status(400).json({ error: "Missing required fields...."})
    } 
    
    try{
    const task = await loginUser.create({first, last, email, password}); // create using that object
    res.status(201).json(task)
  } catch(error){
    console.log('Error', error)
  }
  }


  const loginTheUser = async (req, res) => {
    console.log('controller hit')
    const {email, password} = req.body


    if(!email, !password){
            return res.status(400).json({ error: "Missing required fields...."})

    }

    try{

      const user = await loginUser.findOne({email})
      if(!user){
              return res.status(400).json({ error: "Incorrect email...."})

      }
      if(user.password != password){
              return res.status(401).json({ message: 'Incorrect password'});

      }

    res.status(200).json({ message: 'Login successful' });


    } catch (error){
      console.log('Error', error)
    }

  }

  module.exports = {postUserData, loginTheUser}
  