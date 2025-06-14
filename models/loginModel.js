const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    first:{
        type:String,
        require:[true, 'Please provide first name'],
        minlength: 3,
        maxLength: 25,
    }, 
    last:{
         type:String,
        require:[true, 'Please provide last name'],
        minlength: 3,
        maxLength: 25,
    },
     email:{
        type:String,
        require:[true, 'Please provide email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'
        ],
        unique: true,
    },
    password:{
        type:String,
        require:[true, 'Please provide password'],
        minLength:6,
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

module.exports = loginUser