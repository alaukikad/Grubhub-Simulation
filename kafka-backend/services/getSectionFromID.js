//import the require dependencies
var Sections=require('../models/Sections');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Section ID ");  
     
    Sections.find({_id:msg.id}, function(err,result,fields){
            if(err) throw err;
    callback(null, result[0].name);
    console.log("after callback");
})
};

exports.handle_request = handle_request;
