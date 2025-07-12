import loginUser from '../models/loginModel.js';
import { StatusCodes } from 'http-status-codes';


const postUserData = async (req, res) => {

  const { first, last, email, password } = req.body;
  if (!first || !last || !email || !password) {
    return res.status(400).json({ error: "Missing required fields...." })
  }

  try {
    const task = await loginUser.create({ first, last, email, password });
    res.status(StatusCodes.CREATED).json({ user: { name: `${task.first} ${task.last}` } })
  } catch (error) {
    console.log('Error', error)
  }
}

const loginTheUser = async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields...." })
  }

  try {
    const user = await loginUser.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: "Incorrect email...." })
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password...." })
    }

    const token = user.createJWT()

    res.cookie('jid', token, {
      httpOnly: true,
      secure: true, ///////CHANGE 
      sameSite: 'none', ///strict
      maxAge: 1000 * 60 * 60
    }).status(200).json({ success: true })
    console.log('loggin in')
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong during login' });
  }
}



export { postUserData, loginTheUser };

