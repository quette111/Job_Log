import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    first:{
        type:String,
        require:[true, 'Please provide first name'],
        minlength: 2,
        maxLength: 25,
    }, 
    last:{
         type:String,
        require:[true, 'Please provide last name'],
        minlength: 2,
        maxLength: 25,
    },
    email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
    trim: true,
    maxLength: 254,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: props => `${props.value} is not a valid email!`
   }
    },
    password:{
        type:String,
        require:[true, 'Please provide password'],
        minLength:10,
        match:[
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/, 'Please provide valid password'
        ],
    },
},
{
  timestamps: true 
})

userSchema.pre('save', async function (next){
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash

    next()
})

userSchema.methods.createJWT = function () {
    
  return jwt.sign(
    { userId: this._id, name: `${this.first} ${this.last}` },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
      algorithm: 'HS256',
    }
  );
};


userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}


const loginUser = mongoose.model('LoginData', userSchema)

export default loginUser;