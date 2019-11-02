//import the require dependencies
var Sections=require('../models/Sections');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Section ");  
   Sections.find({rid:msg.email}, function(err,result,fields){
           if(err) throw err;

           let a=[]
           for(var i=0;i<result.length;i++){
             a.push({"key" : result[i]._id,"value" :result[i].name} )
           }
    callback(null, JSON.stringify(a));
    console.log("after callback");
})
};

exports.handle_request = handle_request;
