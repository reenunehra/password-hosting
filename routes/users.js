const express = require('express');
const router  = express.Router();
 
const controller = require('../controller/users');



router.post('/signup', controller.LoggerMiddleware,controller.hashConversion, controller.addSignupDetails );
// router.get('/login', controller.getLoginData );



module.exports = router;