var express = require('express');
var router = express.Router();
let con=require('../../../db');
const bcrypt =require('bcryptjs');
const saltRounds =10;
var Restaurants=require('../../../models/Restaurants');

router.post('/rlogin',function(req,res){
    var found=false;
        Restaurants.find({}, function(err,result,fields){
          if(err) throw err;
          var uname="";
          var msg="";
          console.log(result);
          console.log(req.body.username);
          console.log(req.body.password);
          //console.log(found);
          
          let rest_data = result;
          let flag = false;
          let passwordInDb="";
          rest_data.forEach(element => {
              if(req.body.username==element.email){
              flag=true;
              uname=element.name;
              passwordInDb=element.password;
              };
          });
            console.log(passwordInDb);
            bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
              if (resp) 
              {
              console.log("kdsl");
              res.cookie("cookie","restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
              res.cookie("user",uname,{maxAge: 900000, httpOnly: false, path : '/'});
              res.cookie("email",req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
              req.session.user = req.body.username;
              msg="Login Successful"  
             }else{
             //console.log("I ma here");
             msg="Invalid credentials"
              }
             res.end(msg)});
          })
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