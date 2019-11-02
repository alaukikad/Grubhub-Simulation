//import the require dependencies
var Menu=require('../models/Menu');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Menu ");  

   Menu.find({email:msg.email}, function(err,result,fields){
           if(err) throw err;
    console.log(result);
    callback(null, JSON.stringify(result));
    console.log("after callback");
}) 
};

exports.handle_request = handle_request;
