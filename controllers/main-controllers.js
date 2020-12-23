const dbSaveError = require('./error_handlers').dbSaveError;
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Setting func to create token
const maxAge = 24 * 60 * 60;
const createTokens = (id)=>{
    return jwt.sign({id}, process.env.JWT_secret, {
        expiresIn:maxAge,
    })
}



module.exports = {
    signup_get:(req, res)=>{
        res.render('signup')},
    signup_post:async (req, res)=>{
        const {email, password} = req.body;
        try{
            //create user instance 
            const user = await User.create({email, password});
            const token = createTokens(user._id);
            res.cookie('jwt', token, {
                httpOnly:true,
                maxAge:maxAge * 1000
            });
            res.status(200).json({user:user._id})
            
        }catch(err){
            res.status(400).json(dbSaveError(err))
        }
    },
    signin_get:(req, res)=>{res.render('signin')},
    signin_post:async (req, res)=>{
        const {email, password} = req.body;
        try{
            const user = await User.login(email, password);
            const token = createTokens(user._id);
            res.cookie('jwt', token, {
                httpOnly:true,
                maxAge:maxAge * 1000
            });
            res.status(200).json({user:user._id})
        }
        catch(err){  
            res.status(400).json(dbSaveError(err))
        }
    },
    logout_get:(req, res)=>{
        res.locals.user = null;
        res.cookie('jwt', '',{maxAge: 1});
        res.redirect('/')
    }
}