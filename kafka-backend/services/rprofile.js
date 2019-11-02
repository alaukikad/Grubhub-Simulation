//import the require dependencies
var Restaurants=require('../models/Restaurants');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Restaurant Profile");  
  
    var found=false;
    Restaurants.find({email : msg.email}, function(err,result,fields){
      if(err) throw err;
        
   console.log("Restaurant : ",JSON.stringify(result[0]));
    callback(null, JSON.stringify(result[0]));
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
