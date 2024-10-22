const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter name']
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        maxlength: [24, 'Password cannot exceed 24 characters'],
        //to ensure security password wil not be given outpside
        select: false
    },
    avatar: {
        type: String
    },
    role :{
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt :{
        type: Date,
        default: Date.now
    }
})
//before saving we do hash the password using bcrypt
///pre-it is middleware,allow us to do action before event occur
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){//this function will call only when password is changed
        next();
    }
    this.password  = await bcrypt.hash(this.password, 10)
})
//using user id create a token (session ) for the user
userSchema.methods.getJwtToken = function(){
   return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword = async function(enteredPassword){
    return  bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function(){
    //Generatating Token
    const token = crypto.randomBytes(20).toString('hex');

    //Generate Hash using SHA and set to resetPasswordToken
   this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

   //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;//30 mins given 

    return token
}
//if i give model name in sigular then collection will be crreated in that name
let model =  mongoose.model('User', userSchema);


module.exports = model;