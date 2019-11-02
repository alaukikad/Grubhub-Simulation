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

  router.post('/upcomingOrder',requireAuth,function(req,res){
    console.log("Inside Upcoming Order");  
    console.log(req.body);   
       
let body = req.body;
console.log("Inside API of Upcoming Order", body)
kafka.make_request('upcoming_order', body, function(err,result){
  console.log(result); 
  if (err){
        res.send("Errorrr!!")
    }else{
        res.send(result);
    }
    
    // Orders.find({uid:req.body.email,status:{$in :["Placed","Preparing","Ready"]}},function(err,result){
    //   if(err) throw err;

    //   res.end(JSON.stringify(result));
    })   
  })

  // router.post('/upcomingOrder',function(req,res){
  //   console.log("Inside Upcoming Order");  
  //   console.log(req.body);   
  //   con.query("SELECT uid from users where email='"+req.body.email+"'", function(err,result1,fields){
  //     if(err) throw err;
  //     con.query("SELECT o.oid,r.name,m.itemname,od.price,od.qty,s.status from orders o,orderdetails od,restaurants r,menu m,status s where s.statid=o.status && o.uid="+result1[0].uid+" && m.mid=od.mid && o.status in (2,3,4) && od.oid=o.oid && o.rid=r.rid ", function(err,result,fields){
  //       if(err) throw err;

  //       res.end(JSON.stringify(result));
  //     })
  //   })
  // })

    module.exports = router;