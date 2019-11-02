//import the require dependencies
var OrderDetails=require('../models/OrderDetails');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Cancel Order");  
   
   OrderDetails.deleteMany({uid:msg.email, status:"Cart"},function(err,result){
     if (err) throw err;
    callback(null, "Cart Cleared!!");
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
