//import the require dependencies
var Menu=require('../models/Menu');

function handle_request(msg, callback){
   console.log(msg);
   console.log("Inside Edit Item ");  
   let body = req.body;
   console.log("Inside API of Edit Item", body)
   kafka.make_request('edit_item', body, function(err,result){
   console.log(result); 
   if (err){
         res.send("Errorrr!!")
     }else{
         res.send(result);
     }

    // Menu.findOneAndUpdate({_id : msg.id},{
    //   itemname:msg.itemname,
    //   desc:msg.description,
    //   price:msg.price,
    //   sid:msg.sid
    // },function (err, result) {
    //         if (err) throw err;
    //         console.log(result.affectedRows + " record(s) updated");
            
    // callback(null, "Details Updated!");
    // console.log("after callback");
})
    
};

exports.handle_request = handle_request;
