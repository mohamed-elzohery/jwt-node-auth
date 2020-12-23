const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    authguard:(req, res, next)=>{  
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, process.env.JWT_secret, (err, encodedToken)=>{
                if(encodedToken){
                    next();
                }else{
                    res.cookie('jwt', process.env.JWT_secret, {maxAge: 1})
                    console.log(err.statusCode, err.message);
                    res.redirect('/signin')
                }
            })
            
        }else{
            res.redirect('/signin')
        }
    },
    userguard:(req, res, next)=>{
        const token = req.cookies.jwt; 
        if(token){
            console.log(token)
            jwt.verify(token, process.env.JWT_secret, (err, encodedToken)=>{
                console.log(encodedToken)
                if(encodedToken){
                    res.redirect('/');
                }else{
                    console.log(err.message)
                    res.cookie('jwt', process.env.JWT_secret, {maxAge: 1})
                    next()
                }
            })
        }else{
            next()
        }
    },
    checkUserData:(req, res, next)=>{  
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, process.env.JWT_secret, async (err, encodedToken)=>{
                if(encodedToken){
                    const user = await User.findById(encodedToken.id);
                    res.locals.user = user;
                    next();
                }else{
                    res.locals.user = null;
                    next()
                }
            })
            
        }else{
            res.locals.user = null;
            next()
        }
    }
}