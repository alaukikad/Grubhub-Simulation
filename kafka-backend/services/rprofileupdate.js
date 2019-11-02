//import the require dependencies
var Restaurants=require('../models/Restaurants');
var Menu=require('../models/Menu');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Restaurant Profile1");  
    
  Restaurants.findOneAndUpdate({email : msg.pemail}, 
    {
    name : msg.restaurant,
    address:msg.address,
    contact :msg.contact,
    email :msg.email,
    city:msg.city,
    zipcode:msg.zipcode,
    oname:msg.fullname,
    cuisine:msg.cuisine
  },
  function (err, result) {
          if (err) throw err;
  })
  Menu.updateMany({rid : msg.pemail}, 
    {
    name : msg.restaurant,
    address:msg.address,
    cuisine:msg.cuisine
  },
  function (err, result) {
    if (err) throw err; 
    callback(null, "Details Updated!");
    console.log("after callback");
})   
};

exports.handle_request = handle_request;
