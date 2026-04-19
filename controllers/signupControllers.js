import loginUser from '../models/loginModel.js';
import { StatusCodes } from 'http-status-codes';


const postUserData = async (req, res) => {
const mailer = eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjU4MmE4YmY1M2UxOGE0OTMyY2E1OWY2MWI3NjNhMmNkNmY1ZTUzNDk1YmUxY2JkOTQ1MTMwNTJhNWE4ZTA5OWRlMzBhZjI0NzliZDFiNWEiLCJpYXQiOjE3NzY2MjYwNzEuODA4NzEzLCJuYmYiOjE3NzY2MjYwNzEuODA4NzE2LCJleHAiOjQ5MzIyOTk2NzEuODAzODg0LCJzdWIiOiIyMjk3ODk4Iiwic2NvcGVzIjpbXX0.ORCQZPdolZ4-1YhpP7koYRIFb-bm2x6WFO9Px-jxkOGrSSZ2w23_YJ6oxJ1HwK_Rb9O1EsGPcHFUZPeH6_KI-8IsPvLxcqJf0mBezHbzHI2BzwjFHjhIXLBEBP_og8zrS8X81oKD9lEmaegAwOWNppcixCDDy2WPbArbm9srDzp3wIGTsIzYfQiPan5piErSE4VWsJMyXNJeo42N1ChfXcSpPvxUqiThkLYgTPLXZPYXMytsjngGw1WV7F_RvF7wWiS5ojZGaGZf-Ub2IcGnWXcI-bWN_qY4NQelHqD7bjbLHpN5LrJR5GqGb-bw-mwuILn4TpxjxK87SioLhFRqnhuMxe7bUn_nrRmr5n6j6AHhysfBGEF_5t4esc8bGWTI1MKBt5VcCt95vOWzThp9pkpX9bXVdmdZu1ySqE-96Qh-HRv4t73E3uv64OwfckmRwz2qSIH4DxcyWiARMFAiQWp3a4JTa45zW1lFw7mDW1ak2WYmEiVuJM1bfs0PN3wfgFd9u1V5jH8VQSrUsnrcX7VjavCpXTuP5pQRlGmncWH2OHveMtZ0d6PmrDqKZrFMyd9Hs_sC3dTIcWByUMzRHvl4b3v4H1r7ohtcZP9q3QlWko-5ykSxeUg4VHtDYPgi-XCT75zv8oPYQMsp7p0xqOFMNkdzdThbY4cv10thaVw;
  const { first, last, email, password } = req.body;
  if (!first || !last || !email || !password) {
    return res.status(400).json({ error: "Missing required fields...." })
  }

  try {
    const task = await loginUser.create({ first, last, email, password });
    await fetch("https://connect.mailerlite.com/api/subscribers", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${mailer}`
  },
  body: JSON.stringify({
    email,
    fields: {
      name: first,
      last_name: last
    },
    groups: ["185203834711181006"]
  })
});
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

