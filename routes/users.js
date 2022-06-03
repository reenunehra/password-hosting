const express = require('express');
const router  = express.Router();
const middleware = require('../middleware/loggerMiddleWare')
 
const controller = require('../controller/users');
const upload = require('../utils/multer')


router.post('/signup', middleware.LoggerMiddleware,controller.hashConversion,upload.upload.single('uploaded_file'), controller.addSignupDetails );
router.get('/login', middleware.LoggerMiddleware, controller.getLoginData );

router.post('/uploadpictures', middleware.LoggerMiddleware, upload.upload.single('uploaded_file'), controller.uploadpictures );



module.exports = router;