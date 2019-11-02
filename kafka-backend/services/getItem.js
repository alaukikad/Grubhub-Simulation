//import the require dependencies
var Menu=require('../models/Menu');

function handle_request(msg, callback){
 
   console.log("Inside Get Item ");   

   Menu.find({_id:msg.id},function(err,result,fields){
     if(err) throw err;
    callback(null,JSON.stringify(result[0]));
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
