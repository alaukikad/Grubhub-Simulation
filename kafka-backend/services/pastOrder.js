//import the require dependencies
var Orders=require('../models/Orders');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Past Order");  
  
  Orders.find({uid:msg.email,status:{$in :["Delivered","Cancelled"]}},function(err,result){
    if(err) throw err;

    callback(null, JSON.stringify(result));
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
