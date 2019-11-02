//import the require dependencies
var Users=require('../models/Users');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Customer Profile");  

Users.find({email : msg.email}, function(err,result,fields){
             if(err) throw err;
    callback(null, result[0]);
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
