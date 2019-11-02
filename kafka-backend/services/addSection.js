//import the require dependencies
var Sections=require('../models/Sections');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Add Section");  
   var respmsg="";
   var found=false;
   var section=Sections({
     name:msg.sectionname,
     rid:msg.email
   }) 

   Sections.find({rid:msg.email}, function(err,result,fields){
     if(err) throw err;
     console.log(result);
      for(var i=0;i<result.length;i++){
        if(msg.sectionname==result[i].name){
          found=true;
          break;
        }
      }
     console.log(found);
    if(found){
      respmsg="Section Already Exists!"
      callback(null, respmsg);
    }else{
     section.save(function(error, results){
         if (error){
                console.log(error);
                respmsg="Could Not Add Section! :(";
                callback(null, respmsg);
             }else {
               console.log("Addededded");
               respmsg="Section Added Successfully!" ;  
               callback(null, respmsg);            
             }
           })
         }
  console.log("after callback");
})
    
};

exports.handle_request = handle_request;
