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

 router.post('/checkOut',requireAuth,function(req,res){
    console.log("Inside CheckOut Item ");  
    console.log(req.body);
  
    let body = req.body;
    console.log("Inside API of Checkout", body)
    kafka.make_request('checkout', body, function(err,result){
      console.log(result); 
      if (err){
            res.send("Errorrr!!")
        }else{
            res.send(result);
        }




    // let p=[];
    // let q=req.body.qty;
    // var sql=""
    
    // OrderDetails.find({uid:req.body.uid, status : "Cart"},function(err,result3,fields){
    //   if(err) throw err;
    //   console.log(result3);
    //   if(result3[0]!=null){  
    //     res.end("You already have Items in your Cart!");
    //   }
    //   else{
    //     var temp;
    //     var i=-1;
    //      let x= q.forEach(item=>{
    //         temp=OrderDetails({
    //           itemname : item.itemname,
    //           qty : item.qty,
    //           price : item.price*item.qty,
    //           uid:req.body.uid,
    //           rid:req.body.rid,
    //           rname:req.body.rname,
    //           status:"Cart"
    //         })
           
    //         temp.save(function(error, results){
    //          if(err) throw err;
    //        })
      
    //     })
      
    //   res.writeHead(200,{
    //     'Content-Type' : 'application/json'
    //   });
    //   res.end("Proceeding!");
    //   }
        
    })
    })
      

    // router.post('/checkOut',function(req,res){
    //   console.log("Inside CheckOut Item ");  
    //   console.log(req.body);
    //   let p=[];
    //   let q=req.body.qty;
    //   var sql=""
    //   con.query("SELECT uid from users where email='"+req.body.uid+"'", function(err,result1,fields){
    //     if(err) throw err;
  
    //     con.query("SELECT * from orderdetails where uid="+result1[0].uid+" AND status=1", function(err,result3,fields){
    //       if(err) throw err;
    //       console.log(result3);
    //       if(result3[0]!=null){  
            
    //         res.end("You already have Items in your Cart!");
    //       }else{
    //     for(var i=0;i<q.length;i++){
    //       console.log(i)
    //       console.log(q[i]);
    //       if(q[i]!=null){
    //         console.log(q[i]);
    //         console.log(i);
    //         sql="SELECT mid,price from menu where mid=?"
           
    //         con.query(sql,[i], function(err,result2,fields){
    //           if(err) throw err;
              
    //           console.log(result2[0].mid);
    //           console.log(result2[0].price);
    //           i=result2[0].mid
    //          con.query("INSERT INTO orderdetails (mid,qty,status,price,uid) VALUES ("+i+","+q[i]+",1,"+q[i]*result2[0].price+","+result1[0].uid+")", function(err,result,fields){
    //         if(err) throw err;
          
    //       })
    //     })
    //       }
    //     }
    //       res.writeHead(200,{
    //         'Content-Type' : 'application/json'
    //       });
    //       res.end("Proceeding!");
        
    //   }
        
    //   })
    // })
    //   })
    module.exports = router;