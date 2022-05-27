const signupModels = require('../models/users');
const async = require('async');
const bcrypt = require('bcrypt');

// custom middleware create
    const LoggerMiddleware = (req,res,next) =>{
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    next();
}


async function hashConversion(req, res, next) {
  console.log("hashConversion");
  console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon(:) when writing routes.
  console.log("req.body", req.body); //Generally used in POST/PUT requests.
  console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10

  await bcrypt.hash(req.body.password, 10, (err,hash)=>{
    console.log("hash",hash);
    if(err){
      // console.log(err)
    }
    console.log("password");
    console.log(hash);
    req.hashedPassword = hash
    next();

  });
}



async function  addSignupDetails(req, res) {
  console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon(:) when writing routes.
  console.log("req.body", req.body); //Generally used in POST/PUT requests.
  console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10
  
  
    console.log(req.hashedPassword)
    async.waterfall([
       
        function(callback){

            const signupObj = {
                email: req.body.email,
                password: req.hashedPassword                
            }
            const details = new signupModels(signupObj);           
            console.log(req.query.password)

              details.save().then((result)=>{
                  console.log(result)
                  callback(null,result);
              }).catch((err)=>{
                  console.log("error",err)
                  callback(true);
              })          
        },       
    ],
    (err,details)=>{
        if(err){
            res.status(400).json({sucess:false, err: err})
        }
        else{
            const data={
                details:details
            }
            res.status(200).json({sucess:true, data:data})
        }
    }
    )
}
////////////////////////////////////////////////////////////////////
function getLoginData(req,res){

    console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon when writing routes.
    console.log("req.body", req.body); //Generally used in POST/PUT requests.
    console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10
  
    async.waterfall([
        function (callback){
  
          signupModels.findOne({ email: req.query.email },function(err,docs){
  
              if(err){
                  console.log(err);
                  callback(true,null)
                }
                console.log("loginData",docs);
                  callback(null, docs)
          });
            
          },
              
        function (docs,callback){
          
          console.log("user",docs);
          if (docs){
  
              bcrypt.compare(req.query.password, user.password, function(err, validate) {
                  if(!validate){
                    console.log("pasword match ", validate)
                    callback(true,null)
                  } else {
                      console.log("pasword match ", validate)
                      callback(null,docs)
                  
                  }
              })
  
        }
  
      }
            
    ],
  
    (err, docs) => {
      if (err) {     
        res.status(400).json({ success: false, err: err , msg:"password dosn't match" });
      } else { 
        let data = {        
          user: user,
          msg:"password match"
        };
        res.status(200).json({ success: true, data: data });
      }
    }
  );
  } 

module.exports = {
    LoggerMiddleware,
    addSignupDetails,
    getLoginData,
    hashConversion
    
};