var express = require('express');
var router = express.Router();
let con=require('../../../db');
var OrderDetails=require('../../../models/OrderDetails');

 router.post('/getCart',function(req,res){
    console.log("Inside Cart");  
    console.log(req.body);
    
    OrderDetails.find({uid:req.body.email, status:"Cart"},function(err,result){
      if(err) throw err;
      res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
        console.log("Menu : ",JSON.stringify(result));
        res.end(JSON.stringify(result));
    })
      
    })

    // router.post('/getCart',function(req,res){
    //   console.log("Inside Cart");  
    //   console.log(req.body);
    //   var found=false;
    //       con.query("SELECT uid from users where email='"+req.body.email+"'", function(err,result1,fields){
    //         if(err) throw err;
           
    //         con.query("SELECT did,oid,o.mid,qty,status,itemname,o.price,m.rid,name from orderdetails o,menu m,restaurants r where uid="+result1[0].uid+" AND status=1 AND o.mid=m.mid AND r.rid=m.rid", function(err,result,fields){
    //           if(err) throw err;
  
    // res.writeHead(200,{
    //     'Content-Type' : 'application/json'
    // });
    //     console.log("Menu : ",JSON.stringify(result));
    //     res.end(JSON.stringify(result));
    //     });
    //   })
    //   })

    module.exports = router;