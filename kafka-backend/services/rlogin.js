//import the require dependencies
var Restaurants=require('../models/Restaurants');
const bcrypt =require('bcryptjs');
const saltRounds =10;
var jwt = require('jsonwebtoken');
var passport = require('passport');
const config = require('../config/settings');

function handle_request(msg, callback){
  let uname="";
   var found=false;
   Restaurants.find({}, function(err,result,fields){
     if(err) throw err;
    
     var respmsg="";
     console.log(result);
     console.log(msg.username);
     console.log(msg.password);
     //console.log(found);
     
     let rest_data = result;
        let flag = false;
        let passwordInDb="";
      
        rest_data.forEach(element => {
            if(msg.username==element.email){
         flag=true;
         uname=element.name;
            passwordInDb=element.password;
            };
        });
       console.log(passwordInDb);
          bcrypt.compare(msg.password, passwordInDb, function(err, resp) {
            if (resp) 
            {
            console.log("kdsl");
         
         respmsg="Login Successful"  
        }else{
        //console.log("I ma here");
        respmsg="Invalid credentials"
         }
         var token={
           email: msg.username,
           user: "restaurant"
         }
          
          var signed_token = jwt.sign(token, config.secret, {
                expiresIn: 86400 // in seconds
            });
      
           var pkg={
             resmsg: respmsg,
             name : uname,
             token : signed_token
           } 
           callback(null, JSON.stringify(pkg));
           console.log("after callback");
        });
     
}) 
};

exports.handle_request = handle_request;
