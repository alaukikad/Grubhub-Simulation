//import the require dependencies
var express = require('express');
var router = express.Router();
let con=require('../../../db')
var OrderDetails=require('../../../models/OrderDetails');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);
  router.post('/cancelOrder',requireAuth,function(req,res){
    console.log("Inside Cancel Order");  
    console.log(req.body); 
    
let body = req.body;
console.log("Inside API of Cancel Order", body)
kafka.make_request('cancel_order', body, function(err,result){
  console.log(result); 
  if (err){
        res.send("Errorrr!!")
    }else{
        res.send(result);
    }
});


    // OrderDetails.deleteMany({uid:req.body.email, status:"Cart"},function(err,result){
    //   if (err) throw err;

    //   res.end("Cart Cleared!")
    // })
  })
  

  // router.post('/cancelOrder',function(req,res){
  //   console.log("Inside Cancel Order");  
  //   console.log(req.body);   
  //   con.query("SELECT uid from users where email='"+req.body.email+"'", function(err,result1,fields){
  //     if(err) throw err;
  //         con.query("DELETE from orderdetails WHERE uid="+result1[0].uid+" AND status=1" ,function (err, result) {
  //           if (err) throw err; 
            
  //           res.end("Cart Cleared!");
  //         })
  //       })
  // })
  
  module.exports = router;