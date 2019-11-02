//import the require dependencies
var Menu=require('../models/Users');
var Sections=require('../models/Sections');

function handle_request(msg, callback){
   console.log(msg);
   console.log("Inside Delete Selection ");  

      Sections.findOneAndDelete({_id : msg.id},
        function (err, result) {
      if (err) throw err;

      Menu.deleteMany({rid:msg.rid, sid:msg.p},function (err, result) {
        if (err) throw err;
      })

    callback(null, "Section Deleted");
    console.log("after callback");
})
    
};

exports.handle_request = handle_request;
