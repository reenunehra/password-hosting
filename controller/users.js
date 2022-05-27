const signupModels = require('../models/users');
const async = require('async');
const bcrypt = require('bcrypt');



 function addSignupDetails(req, res) {
  console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon(:) when writing routes.
  console.log("req.body", req.body); //Generally used in POST/PUT requests.
  console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10

    async.waterfall([
        function(callback){
            const signupObj = {
                email: req.body.email,
                password: req.body.password
            }

            if (!(req.body.email && req.body.password)) {
              return res.status(400).send({ error: "Data not formatted properly" });
            }

            const details = new signupModels(signupObj);

           

            // const salt = bcrypt.hash(details.password, salt);
            
              details.password =  bcrypt.hash(req.query.password, 10, (err,hash)=>{
                console.log("hash",hash);
              });
              console.log(req.query.password)

              details.save().then((result)=>{
                res.status(201).send(result);               
                  callback(null,details);
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

//  -----------------------------------get login data------------------------------------------

//  function getLoginData(req,res){

//   console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon(:) when writing routes.
//   console.log("req.body", req.body); //Generally used in POST/PUT requests.
//   console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10

//   async.waterfall([
//       function (callback){

//         const body = req.body;
//         const user = await signupModels.findOne({ email: body.email });
          
//           if(err){
//             console.log(err);
//             callback(true)
//           }
//           console.log("loginData",user);
//             callback(null, user)
//         };
            
//       function (user,callback){
        
//         if (user){
//           const validPassword = await bcrypt.compare(body.password, user.password);
//           if (validPassword) {
//                   res.status(200).json({ message: "Valid password" });
//                   callback(null);
//              } else {
//                   res.status(400).json({ error: "Invalid Password" });
//                   callback(true);
//              }
//              } else {
//                   res.status(401).json({ error: "User does not exist" });
//              } 
//         }
//       ),      
//   ],

//   (err, user) => {
//     if (err) {     
//       res.status(400).json({ success: false, err: err });
//     } else { 
//       let data = {        
//         user: user,
//       };
//       res.status(200).json({ success: true, data: data });
//     }
//   }
// );
// }



module.exports = {
    addSignupDetails
    // ,
    // getLoginData
};