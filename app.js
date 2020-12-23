const express = require('express');
const mongoose = require('mongoose');
const ejsLayouts = require('express-ejs-layouts');
const morgan= require('morgan');
const path = require('path');
const cors = require('cors');
const cookieParser =  require('cookie-parser');



const app = express();
app.use(cors());
// middleware

//Setting static folder
app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');



//setting dot env
const dotEnv = require('dotenv')
dotEnv.config({path: './config/keys.env'});

const PORT  = process.env.PORT || 5000 ;

// database connection
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:false})
.then(connect =>{console.log(`Data base is connected`)})
.catch(err=>console.log(err.message))

//Use morgan as logger
if(process.env.NODE_ENV == 'development'){
  app.use(morgan('dev'))
};

//Exporting routes from controllers
app.use('/', require('./routes/main-routes'))
app.use('/error', require('./routes/error-routes'))


/*
//Setting cookie test
app.get('/set-cookie',(req, res)=>{
  res.cookie('newUser', true);
  res.cookie('adsOn', false, {httpOnly:true});
  res.cookie('stayLogged', "16h", {secure:true});
  res.send("Cookies are  set.")
})
app.get('/read-cookies', (req, res)=>{
   const allCookies = req.cookies;
   console.log(allCookies.newUser);
   res.json(allCookies);
})

app.get('/test',(req, res)=>{
  const userName= "mohamed";
  res.render('test')
})

app.post('/testPost',(req, res)=>{
  const userName= req.body.name;
  res.json({name:userName});
})
*/

//Spinning the server
app.listen(PORT,()=>console.log(`app is running on ${PORT}`))

