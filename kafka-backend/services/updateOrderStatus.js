//import the require dependencies
var Orders=require('../models/Orders');

function handle_request(msg, callback){
   console.log(msg);
   console.log("Inside Update Order Status");  
   Orders.findOneAndUpdate({_id:msg.oid},{status:msg.status},function(err,result){
         if(err) throw err;
         callback(null, "Status Updated!");
    console.log("after callback");
})
};

exports.handle_request = handle_request;
