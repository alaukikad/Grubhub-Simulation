//import the require dependencies
var Orders=require('../models/Orders');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Cancelled Order");  
 
    Orders.find({rid:msg.email,status:"Cancelled"},function(err,result){
      if(err) throw err;
        console.log(result);
      callback(null, JSON.stringify(result));
    console.log("after callback");
})   
};

exports.handle_request = handle_request;
