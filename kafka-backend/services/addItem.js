//import the require dependencies
var Menu=require('../models/Menu');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside Add Item");  

  var respmsg="";
  var found=false;
  var menu=Menu({
    itemname:msg.itemname,
    email:msg.email,
    desc:msg.description,
    price:msg.price,
    sid:msg.sid,
    cuisine:msg.cuisine,
    name:msg.name,
    address:msg.address,
    rimage : msg.rimage
  }) 

  Menu.find({email:msg.email}, function(err,result,fields){
    if(err) throw err;
    console.log(result);
    for(var i=0;i<result.length;i++){
      if(msg.sid==result[i].sid && msg.itemname==result[i].itemname){
        found=true;
        break;
      }
    }
    if(found){
      respmsg="Item Already Exists!"
      callback(null, respmsg);
    }else{
      menu.save(function(error, results) {
            if (error){
               console.log(error);
               respmsg="Could Not Add Item! :(";
               callback(null, respmsg);
            }else {
              console.log("Addededded");
              respmsg="Item Added Successfully!" ;  
              callback(null, respmsg);
                        
          }
        })
      }
 console.log("after callback");
})
};

exports.handle_request = handle_request;
