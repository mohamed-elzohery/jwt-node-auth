const router = require('express').Router();
const authControllers = require('../controllers/main-controllers');
const {authguard, userguard, checkUserData} = require('../middleware/authguard');


//Start Main routes
//GET REQ
//Desc: render home page
router.get('*', checkUserData)

router.get('/',authguard ,(req, res)=>{
    res.render('home');
});

router.get('/logout',authControllers.logout_get)


//GET REQ
//Desc: render smoothies page
router.get('/smoothies',authguard,(req, res)=>{
    res.render('smoothies');
});

router.get('/signup',userguard ,authControllers.signup_get);
router.post('/signup',userguard ,authControllers.signup_post);
router.get('/signin',userguard ,authControllers.signin_get);
router.post('/signin',userguard ,authControllers.signin_post);


module.exports =  router;