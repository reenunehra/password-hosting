const express = require('express');
const router  = express.Router();
const middleware = require('../middleware/loggerMiddleWare')
 
const controller = require('../controller/users');



router.post('/signup', middleware.LoggerMiddleware,controller.hashConversion, controller.addSignupDetails );
router.get('/login', middleware.LoggerMiddleware, controller.getLoginData );



module.exports = router;