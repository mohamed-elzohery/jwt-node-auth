const mongoose = require('mongoose');
const {isAlphanumeric, isEmail} = require('validator');
const bcrybt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:{validator:isEmail,message:'Please enter a valid Email'}
    },
    password:{
        type:String,
        required:[true, 'Please enter a password'],
        minlength:[6, 'Password should be 6 characters at least'],
        validate:{validator:isAlphanumeric,message:'Please enter a valid password'}
    }
});

userSchema.pre('save',async function(next){
    const salt = await bcrybt.genSalt(16);
    this.password = await bcrybt.hash(this.password, salt);
    next()
});

//setting login function on statics
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrybt.compare(password, user.password);
        if(auth){
            return user
        }
        throw new Error('Paasword is incorrect')
    }throw new Error('Email is in correct')

};

const User = mongoose.model('users', userSchema);

module.exports = User;