const express =require('express');
const router= express.Router();


const authCtrl= require('../controllers/auth_controller');
const jwtVerification = require('../config/jwtVerification');


router.post('/register',authCtrl.register);
router.post('/authenticate',authCtrl.authenticate);
router.get('/userProfile',jwtVerification.verifyJwtToken,authCtrl.userProfile);


module.exports=router;