//import the require dependencies
var Orders=require('../models/Orders');
var OrderDetails=require('../models/OrderDetails');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Confirm Order");  
   
   var order=Orders({
     price: msg.total,
     uid:msg.email,
     status:"Placed", 
     rid:msg.rid,
     uname:msg.uname,
     uaddress:msg.uaddress,
     rname:msg.rname,
     orderDetails : msg.cart
   })  
   order.save(function(error, results){
     if (error) throw error
   })
   
OrderDetails.updateMany({uid:msg.email, status:"Cart"},{status:"Ordered"},function(err){
 if (err) throw err;
})
    callback(null, "Order Placed!");
    console.log("after callback");
    
};

exports.handle_request = handle_request;
