//import the require dependencies
var OrderDetails=require('../models/OrderDetails');

function handle_request(msg, callback){
   console.log(msg.email);
   console.log("Inside CheckOut Item ");  
  
   let q=msg.qty;
   
   OrderDetails.find({uid:msg.uid, status : "Cart"},function(err,result3,fields){
     if(err) throw err;
     console.log(result3);
     if(result3[0]!=null){  
      callback(null,"You already have Items in your Cart!"); 
     }
     else{
       var temp;
       let x= q.forEach(item=>{
             temp=OrderDetails({
             itemname : item.itemname,
             qty : item.qty,
             price : item.price*item.qty,
             uid:msg.uid,
             rid:msg.rid,
             rname:msg.rname,
             status:"Cart"
      })
          
      temp.save(function(error, results){
      if(err) throw err;
      })
     
      })
      callback(null,"Proceeding");
     }
    console.log("after callback");
})   
};

exports.handle_request = handle_request;
