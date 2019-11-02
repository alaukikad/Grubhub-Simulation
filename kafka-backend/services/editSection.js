//import the require dependencies
var Sections=require('../models/Sections');
var Menu=require('../models/Menu')

function handle_request(msg, callback){
   console.log(msg);
    console.log("Inside Edit Section ");  
    Menu.updateMany({rid:msg.rid, sid:msg.p},{sid:msg.name},function (err, result) {
      if (err) throw err;
            Sections.findOneAndUpdate({_id : msg.id},{
              name:msg.name
            },function (err, result) {
            if (err) throw err;

              console.log(result)
              callback(null, "Section Updated!");
              console.log("after callback");
            })
            
   
    
})
    
};

exports.handle_request = handle_request;
