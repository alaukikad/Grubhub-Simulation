var express = require('express');
var router = express.Router();
let con=require('../../../db');
const bcrypt =require('bcryptjs');
const saltRounds =10;
var Users=require('../../../models/Users');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../../../config/settings');
var kafka = require('../../../kafka/client');

// Bring in defined Passport Strategy
require('../../../config/passport')(passport);


router.post('/login',function(req,res){
  var found=false;
  console.log(req.body)

  let body = req.body;
  console.log("Inside API of Login", body)
  kafka.make_request('login', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
        res.send(result);
      }


//       Users.find({}, function(err,result,fields){
//         if(err) throw err;
//         var resMsg="";
//         var uname;
//         let cust_data = result;
//         let flag = false;
//         let passwordInDb="";
//         cust_data.forEach(element => {
//         if(req.body.username==element.email){
//           flag=true;
//           uname=element.name;
//           passwordInDb=element.password;
//           }
//         });
//           bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
//             if (resp) 
//             {
//             console.log("alalsk");
//             res.cookie("cookie","customer",{maxAge: 900000, httpOnly: false, path : '/'});
//             res.cookie("user",uname,{maxAge: 900000, httpOnly: false, path : '/'});
//             res.cookie("email",req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
//             req.session.user = req.body.username;
            
//             resMsg="Login Successful"  
//             }else{
//              resMsg="Invalid credentials"
//       }
//    var token={
//      email: req.body.username,
//      user: "customer"
//    }
    
//     var signed_token = jwt.sign(token, config.secret, {
//           expiresIn: 86400 // in seconds
//       });

//      var pkg={
//        msg: resMsg,
//        token : signed_token,
//        name: uname,
//      } 
//       res.end(JSON.stringify(pkg));
     
//   });
  })
})


// router.post('/login',function(req,res){
//   var found=false;
//   console.log(req.body)
//       con.query("SELECT email,password,name from users", function(err,result,fields){
//         if(err) throw err;
//         var msg="";
//         var uname;
//         let cust_data = result;
//         let flag = false;
//         let passwordInDb="";
//         cust_data.forEach(element => {
//         if(req.body.username==element.email){
//           flag=true;
//           uname=element.name;
//           passwordInDb=element.password;
//           }
//         });
//           bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
//             if (resp) 
//             {
//             console.log("alalsk");
//             res.cookie("cookie","customer",{maxAge: 900000, httpOnly: false, path : '/'});
//             res.cookie("user",uname,{maxAge: 900000, httpOnly: false, path : '/'});
//             res.cookie("email",req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
//             req.session.user = req.body.username;
//             msg="Login Successful"  
//             }else{
      
//       msg="Invalid credentials"
//       }
   
//       res.end(msg);
     
//   });
//   })
// })

module.exports = router;