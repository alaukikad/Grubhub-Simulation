//import the require dependencies
var Users=require('../models/Users');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Customer Profile Update");  
     
   Users.findOneAndUpdate({email : msg.pemail}, 
     {
     name : msg.fullname,
     address:msg.address,
     contact :msg.contact,
     email :msg.email
   },
     function(err, result) {
      if (err) throw err;
  
     console.log(result.affectedRows + " record(s) updated");
    callback(null, "Details Updated!");
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
