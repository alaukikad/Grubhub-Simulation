//import the require dependencies
var Messages=require('../models/Messages');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Get Message  ");  
     
    Messages.find({receiver:msg.email}, function(err,result,fields){
            if(err) throw err;
    callback(null, result);
    console.log("after callback");
})
};

exports.handle_request = handle_request;
