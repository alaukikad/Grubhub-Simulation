//import the require dependencies
var Restaurants=require('../models/Restaurants');
const bcrypt =require('bcryptjs');
const saltRounds =10;
var jwt = require('jsonwebtoken');
var passport = require('passport');
const config = require('../config/settings');

function handle_request(msg, callback){
   console.log(msg);
   var found=false;
    var respmsg="";
    var restaurant=Restaurants({
      name:msg.restaurant,
      email:msg.email,
      oname :msg.fullname,
      contact:msg.contact,
      address:msg.address,
      city:msg.city,
      zipcode:msg.zipcode,
      cuisine:msg.cuisine
    })  
      Restaurants.find({}, function(err,result,fields){
         if(err) throw err;
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
          callback(null, JSON.stringify(pkg)); 
        }else{
          bcrypt.hash(msg.password, saltRounds, function(err, hash) 
                      {
                          restaurant.password=hash;
                          restaurant.save(function(error, results){
                              if (error){
                                  console.log(error);
                                  respmsg="error";
                                  var pkg={
                                    resmsg: respmsg
                                  }
                                  callback(null, JSON.stringify(pkg)); 
                              }else {
                                console.log("Howdyyy");
                                respmsg="Restaurant Added Successfully!" ;  
                                var token={
                                  email: msg.email,
                                  user: "customer"
                                 }
           
                                var signed_token = jwt.sign(token, config.secret, {
                                    expiresIn: 86400 // in seconds
                                 });
       
                               var pkg={
                               resmsg: respmsg,
                               name: msg.restaurant,
                               token : signed_token
                                } 
                                
                               callback(null, JSON.stringify(pkg));    
                               console.log("after callback");      
                                }
                          });
                      });
          }
    
})
    
};

exports.handle_request = handle_request;
