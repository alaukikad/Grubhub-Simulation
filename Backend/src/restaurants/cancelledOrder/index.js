var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Orders=require('../../../models/Orders')

router.post('/cancelledOrder',function(req,res){
    console.log("Inside Cancelled Order");  
    console.log(req.body);   
    Orders.find({rid:req.body.email,status:"Cancelled"},function(err,result){
      if(err) throw err;
        console.log(result);

        res.end(JSON.stringify(result));
    })
  })

  // router.post('/cancelledOrder',function(req,res){
  //   console.log("Inside Cancelled Order");  
  //   console.log(req.body);   
  //   con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
  //     if(err) throw err;
  //     con.query("SELECT u.name,u.address,u.uid,o.oid,m.itemname,od.price,od.qty,s.status from users u,orders o,orderdetails od,restaurants r,menu m,status s where s.statid=o.status && u.uid=o.uid && r.rid="+result1[0].rid+" && m.mid=od.mid && o.status=5 && od.oid=o.oid && o.rid=r.rid ", function(err,result,fields){
  //       if(err) throw err;

  //       res.end(JSON.stringify(result));
  //     })
  //   })
  // })
    module.exports = router;