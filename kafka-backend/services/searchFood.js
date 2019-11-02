//import the require dependencies
var Menu=require('../models/Menu');
var Restaurants=require('../models/Restaurants');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Search ");  
   let c=msg.criteria;

   if(c=="cuisine"){
       Restaurants.find({cuisine:msg.searchFood}, function(err,result,fields){
         if(err) throw err;
           console.log(result);
           callback(null, JSON.stringify(result));
        })
       }else if(c=="zipcode"){
         Restaurants.find({zipcode:msg.searchFood}, function(err,result1,fields){
           if(err) throw err;
            console.log(result1);
            callback(null, JSON.stringify(result1)); 
       })
       }else if(c=="foodItem"){
        Menu.find({itemname : msg.searchFood},function(err,result,fields){
          if(err) throw err
          console.log(result);
          callback(null, JSON.stringify(result));
        })
       }
       else if(c=="restaurant"){
         Restaurants.find({name:msg.searchFood}, function(err,result1,fields){
           if(err) throw err;
         console.log(result1);
         callback(null, JSON.stringify(result1));
         })
       }
    console.log("after callback");  
};

exports.handle_request = handle_request;
