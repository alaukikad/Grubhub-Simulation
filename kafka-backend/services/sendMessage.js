//import the require dependencies
var Messages=require('../models/Messages');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Send Message");  
   var respmsg="";
  
   var message=Messages({
     sender:msg.sender,
     receiver:msg.receiver,
     body:msg.body
   }) 

     message.save(function(error, results){
         if (error){
                console.log(error);
                respmsg="Could Not Send Message! :(";
                callback(null, respmsg);
             }else {
               console.log("Addededded");
               respmsg="Message Sent!" ;  
               callback(null, respmsg);    
               console.log("after callback");        
             }
           })
};

exports.handle_request = handle_request;
