var express = require('express');
var router = express.Router();
let con=require('../../../db')
var OrderDetails=require('../../../models/OrderDetails');
var Orders= require('../../../models/Orders');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

 router.post('/confirmOrder',requireAuth,function(req,res){
    console.log("Inside Confirm Order");  
    console.log(req.body);   
    let body = req.body;
    console.log("Inside API of Confirm Order", body)
    kafka.make_request('confirm_order', body, function(err,result){
      console.log(result); 
      if (err){
            res.send("Errorrr!!")
        }else{
            res.send(result);
        }
      })
//     var temp=[];
    
//     var order=Orders({
//       price: req.body.total,
//       uid:req.body.email,
//       status:"Placed", 
//       rid:req.body.rid,
//       uname:req.body.uname,
//       uaddress:req.body.uaddress,
//       rname:req.body.rname,
//       orderDetails : req.body.cart
//     })  
//     order.save(function(error, results){
//       if (error) throw error
//     })
    
// OrderDetails.updateMany({uid:req.body.email, status:"Cart"},{status:"Ordered"},function(err){
//   if (err) throw err;
// })
// res.end("Order Placed!")
  })

  // router.post('/confirmOrder',function(req,res){
  //   console.log("Inside Confirm Order");  
  //   console.log(req.body);   
  //   con.query("SELECT uid from users where email='"+req.body.email+"'", function(err,result1,fields){
  //     if(err) throw err;
  //   con.query("INSERT INTO orders (uid,rid,status,price,timestamp) VALUES ("+result1[0].uid+","+req.body.rid+",2,"+req.body.total+",now())", function(err,result2,fields){
  //     if(err) throw err;
  //     con.query("SELECT * from orders where uid="+result1[0].uid+" AND rid="+req.body.rid+" AND status=2 AND price="+req.body.total, function(err,result3,fields){
  //       if(err) throw err;
    
  //         con.query("UPDATE orderdetails SET status=2,oid="+result3[0].oid+" WHERE uid="+result1[0].uid+" AND status=1" ,function (err, result) {
  //           if (err) throw err; 
  //           console.log(result.affectedRows + " record(s) updated");
  //           res.end("Details Updated!");
  //         })
  //         });
  //   })
  // })
  // })

    module.exports = router;