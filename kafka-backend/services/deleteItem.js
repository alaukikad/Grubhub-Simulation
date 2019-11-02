//import the require dependencies
var Menu=require('../models/Menu');

function handle_request(msg, callback){
   console.log(msg);
   console.log("Inside Delete Item ");  
 
       Menu.findOneAndDelete({_id : msg.id},function(err,result,fields){
         if(err) throw err;
    callback(null, "Item Deleted");
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
