//import the require dependencies
var Orders=require('../models/Orders');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Pending Order");  
   
   Orders.find({rid:msg.email,status:{$in :["Placed","Preparing","Ready"]}},function(err,result){
      if(err) throw err;

    console.log(result);  
    callback(null, JSON.stringify(result));
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
