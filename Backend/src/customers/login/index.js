var express = require('express');
var router = express.Router();
let con=require('../../../db');
const bcrypt =require('bcryptjs');
const saltRounds =10;
var Users=require('../../../models/Users');

router.post('/login',function(req,res){
  var found=false;
  console.log(req.body)
      Users.find({}, function(err,result,fields){
        if(err) throw err;
        var msg="";
        var uname;
        let cust_data = result;
        let flag = false;
        let passwordInDb="";
        cust_data.forEach(element => {
        if(req.body.username==element.email){
          flag=true;
          uname=element.name;
          passwordInDb=element.password;
          }
        });
          bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
            if (resp) 
            {
            console.log("alalsk");
            res.cookie("cookie","customer",{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie("user",uname,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie("email",req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.username;
            msg="Login Successful"  
            }else{
      
      msg="Invalid credentials"
      }
   
      res.end(msg);
     
  });
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