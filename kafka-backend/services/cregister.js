//import the require dependencies
var Users=require('../models/Users');
const bcrypt =require('bcryptjs');
const saltRounds =10;
var jwt = require('jsonwebtoken');
var passport = require('passport');
const config = require('../config/settings');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Customer Register");  
   
   var found=false;
   var respmsg="";
  
   var user=Users({
     name:msg.fullname,
     email:msg.email,
     contact:msg.contact,
     address:msg.address
   })
 
   Users.find({ }, function(err, result) {
     if (err) throw err;
     console.log(result);
     console.log(msg.email)
     
     for(var i=0;i<result.length;i++){
        if(msg.email==result[i].email){
             found=true;
             break;
           }
         }
        console.log(found);
       if(found){
         respmsg="Email Already in Use!"
         var pkg={
            resmsg: respmsg
          }
          callback(null, pkg);
       }else{
         bcrypt.hash(msg.password, saltRounds, function(err, hash) {
                         user.password=hash;
                             
                         user.save(function(error, results) 
                         {
                             if (error) 
                             {
                                 console.log("alaukika:P");
                                 console.log(error);
                                 respmsg="error";
 
                               var pkg={
                                   resmsg: respmsg
                                 }
                                 callback(null, pkg);
                                
                             }     
                             else      
                             {       
                             respmsg="User Added Successfully!";
 
                             var token={
                               email: msg.email,
                               user: "customer"
                             }
                              
                              var signed_token = jwt.sign(token, config.secret, {
                                    expiresIn: 86400 // in seconds
                                });
                          
                               var pkg={
                                 resmsg: respmsg,
                                 name : msg.fullname,
                                 token : signed_token
                               } 
                               
                               callback(null, pkg);
                             }       
                         });       
                     }); 
         }
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
