//import the require dependencies
var Users=require('../models/Users');
const bcrypt =require('bcryptjs');
const saltRounds =10;
var jwt = require('jsonwebtoken');
var passport = require('passport');
const config = require('../config/settings');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Customer Login");  

   var found=false;
 
       Users.find({}, function(err,result,fields){
         if(err) throw err;
         var resMsg="";
         var uname;
         let cust_data = result;
         let flag = false;
         let passwordInDb="";
         cust_data.forEach(element => {
         if(msg.username==element.email){
           flag=true;
           uname=element.name;
           passwordInDb=element.password;
           }
         });
           bcrypt.compare(msg.password, passwordInDb, function(err, resp) {
             if (resp) 
             {
             console.log("alalsk");  
             resMsg="Login Successful"  
             }else{
              resMsg="Invalid credentials"
             }
             var token={
            email: msg.username,
            user: "customer"
              }
     
     var signed_token = jwt.sign(token, config.secret, {
           expiresIn: 86400 // in seconds
       });
 
       var pkg={
        msg: resMsg,
        name: uname,
        token : signed_token
      } 
       
    callback(null, JSON.stringify(pkg));
    console.log("after callback");
})
})  
};

exports.handle_request = handle_request;
