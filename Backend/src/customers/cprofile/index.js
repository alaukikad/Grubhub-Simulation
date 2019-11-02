//import the require dependencies
var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Users=require('../../../models/Users');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');
//router.use(requireAuth);

require('../../../config/passport')(passport);

router.post('/cprofile',requireAuth,function(req,res){
    console.log("Inside Customer Profile");  
    console.log(req.body);
//     var found=false;
//       Users.find({email : req.body.email}, function(err,result,fields){
//           if(err) throw err;
         
//   res.writeHead(200,{
//       'Content-Type' : 'application/json'
//   });
//   console.log("User : ",JSON.stringify(result[0]));
//   res.end(JSON.stringify(result[0]));
//       });

let body = {
    email: req.body.email
  }
  console.log("Inside API of Cprofile", body)
  kafka.make_request('cprofile', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
          res.send(result);
      }
  });
    })

//  router.post('/cprofile',function(req,res){
//     console.log("Inside Customer Profile");  
//     console.log(req.body);
//     var found=false;
//         con.query("SELECT * from users where email='"+req.body.email+"'", function(err,result,fields){
//           if(err) throw err;
         
//   res.writeHead(200,{
//       'Content-Type' : 'application/json'
//   });
//   console.log("User : ",JSON.stringify(result[0]));
//   res.end(JSON.stringify(result[0]));
//       });
  
//     })

module.exports = router;