//import the require dependencies
var Cuisines=require('../models/Cuisines');

function handle_request(msg, callback){
   console.log(msg); 
   console.log("Inside Cuisine ");  
   var cuisineList=[];
   
       Cuisines.find({}, function(err,result,fields){
         if(err) throw err;
        
         for(var i=0;i<result.length;i++){
           cuisineList[i]=result[i].name;
         }
       
   console.log(cuisineList);

    callback(null, JSON.stringify(cuisineList));
    console.log("after callback");
})
};

exports.handle_request = handle_request;
