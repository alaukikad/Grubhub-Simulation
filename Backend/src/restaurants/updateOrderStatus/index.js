var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Orders=require('../../../models/Orders');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});

//router.use(requireAuth);

require('../../../config/passport')(passport);

  router.post('/updateOrderStatus',requireAuth,function(req,res){
    console.log("Inside Update Order Status");  
    console.log(req.body);   
    
    Orders.findOneAndUpdate({_id:req.body.oid},{status:req.body.status},function(err,result){
          if(err) throw err;

          res.end("Status Updated!");
        })
  })

  // router.post('/updateOrderStatus',function(req,res){
  //   console.log("Inside Update Order Status");  
  //   console.log(req.body);   
  //   con.query("SELECT statid from status where status='"+req.body.status+"'", function(err,result1,fields){
  //     if(err) throw err;
  //     con.query("UPDATE orders SET status="+result1[0].statid+" WHERE oid="+req.body.oid, function(err,result,fields){
  //       if(err) throw err;

  //       con.query("UPDATE orderdetails SET status="+result1[0].statid+" WHERE oid="+req.body.oid, function(err,result,fields){
  //         if(err) throw err;
        
        
  //         res.end("Details Updated!");

  //       })
  //     })
  //   })
  // })

    module.exports = router;