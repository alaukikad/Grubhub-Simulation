var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Orders=require('../../../models/Orders');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

  router.post('/pendingOrder',requireAuth,function(req,res){
    console.log("Inside Pending Order");  
    console.log(req.body);   
    
    let body = req.body;
console.log("Inside API of Pending Order", body)
kafka.make_request('pending_order', body, function(err,result){
console.log(result); 
if (err){
      res.send("Errorrr!!")
  }else{
      res.send(result);
  }
});
    // Orders.find({rid:req.body.email,status:{$in :["Placed","Preparing","Ready"]}},function(err,result){
    //   if(err) throw err;
       
    //   console.log(result);
    //     res.end(JSON.stringify(result));
    //   })
    
  })
  

  // router.post('/pendingOrder',function(req,res){
  //   console.log("Inside Pending Order");  
  //   console.log(req.body);   
  //   con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
  //     if(err) throw err;
  //     con.query("SELECT u.name,u.address,u.uid,o.oid,m.itemname,od.price,od.qty,s.status from users u,orders o,orderdetails od,restaurants r,menu m,status s where s.statid=o.status && u.uid=o.uid && r.rid="+result1[0].rid+" && m.mid=od.mid && o.status in (2,3,4) && od.oid=o.oid && o.rid=r.rid ", function(err,result,fields){
  //       if(err) throw err;
  //       console.log(result);
  //       res.end(JSON.stringify(result));
  //     })
  //   })
  // })

    module.exports = router;