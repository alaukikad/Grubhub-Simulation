var express = require('express');
var router = express.Router();
let con=require('../../../db');
const bcrypt =require('bcryptjs');
const saltRounds =10;
var Restaurants=require('../../../models/Restaurants');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../../../config/settings');
var kafka = require('../../../kafka/client');

// Bring in defined Passport Strategy
require('../../../config/passport')(passport);

router.post('/rlogin',function(req,res){
console.log("Inside restaurant Login");
   
  let body = req.body;
  console.log("Inside API of Restaurant login", body)
  kafka.make_request('rlogin', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
          res.send(result);
      }
  });


  //   var found=false;
  //       Restaurants.find({}, function(err,result,fields){
  //         if(err) throw err;
  //         var uname="";
  //         var msg="";
  //         console.log(result);
  //         console.log(req.body.username);
  //         console.log(req.body.password);
  //         //console.log(found);
          
  //         let rest_data = result;
  //         let flag = false;
  //         let passwordInDb="";
  //         rest_data.forEach(element => {
  //             if(req.body.username==element.email){
  //             flag=true;
  //             uname=element.name;
  //             passwordInDb=element.password;
  //             };
  //         });
  //           console.log(passwordInDb);
  //           bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
  //             if (resp) 
  //             {
  //             console.log("kdsl");
  //             res.cookie("cookie","restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
  //             res.cookie("user",uname,{maxAge: 900000, httpOnly: false, path : '/'});
  //             res.cookie("email",req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
  //             req.session.user = req.body.username;
  //             msg="Login Successful"  
  //            }else{
  //            //console.log("I ma here");
  //            msg="Invalid credentials"
  //             }
  //             var token={
  //               email: req.body.username,
  //               user: "restaurant"
  //             }
               
  //              var signed_token = jwt.sign(token, config.secret, {
  //                    expiresIn: 86400 // in seconds
  //                });
           
  //               var pkg={
  //                 resmsg: msg,
  //                 token : signed_token
  //               } 
  //                res.end(JSON.stringify(pkg));
  //            });
  //     })
      })


// router.post('/rlogin',function(req,res){
//     var found=false;
//         con.query("SELECT email,password,name from restaurants", function(err,result,fields){
//           if(err) throw err;
//           var uname="";
//           var msg="";
//           console.log(result);
//           console.log(req.body.username);
//           console.log(req.body.password);
//           //console.log(found);
          
//           let cust_data = result;
//           let flag = false;
//           let passwordInDb="";
//           cust_data.forEach(element => {
//               if(req.body.username==element.email){
//               flag=true;
//               uname=element.name;
//               passwordInDb=element.password;
//               };
//           });
//             console.log(passwordInDb);
//             bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
//               if (resp) 
//               {
//               console.log("kdsl");
//               res.cookie("cookie","restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
//               res.cookie("user",uname,{maxAge: 900000, httpOnly: false, path : '/'});
//               res.cookie("email",req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
//               req.session.user = req.body.username;
//               msg="Login Successful"  
//              }else{
//              //console.log("I ma here");
//              msg="Invalid credentials"
//               }
//              res.end(msg)});
//           })
//       })

      module.exports = router;