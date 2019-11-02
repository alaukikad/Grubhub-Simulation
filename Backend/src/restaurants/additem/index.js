var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Menu=require('../../../models/Menu');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

router.post('/additem',requireAuth,function(req,res){ 
  console.log("Inside Add Item ");  
  console.log(req.body); 
  
let body = req.body;
console.log("Inside API of Add Item", body)
kafka.make_request('add_item', body, function(err,result){
console.log(result); 
if (err){
      res.send("Errorrr!!")
  }else{
      res.send(result);
  }
});


  // var msg="";
  // var found=false;
  // var menu=Menu({
  //   itemname:req.body.itemname,
  //   email:req.body.email,
  //   desc:req.body.description,
  //   price:req.body.price,
  //   sid:req.body.sid,
  //   cuisine:req.body.cuisine,
  //   name:req.body.name,
  //   address:req.body.address,
  //   rimage : req.body.rimage
  // }) 

  // Menu.find({email:req.body.email}, function(err,result,fields){
  //   if(err) throw err;
  //   console.log(result);
  //   for(var i=0;i<result.length;i++){
  //     if(req.body.sid==result[i].sid && req.body.itemname==result[i].itemname){
  //       found=true;
  //       break;
  //     }
  //   }
  //   if(found){
  //     msg="Item Already Exists!"
  //     res.end(msg);
  //   }else{

  //     menu.save(function(error, results) {
  //           if (error){
  //              console.log(error);
  //              msg="Could Not Add Item! :(";
  //              res.end(msg);
  //           }else {
  //             console.log("Addededded");
  //             msg="Item Added Successfully!" ;  
             
  //             res.end(msg);            
  //         }
  //       })
  //     }
  // });
})

  // router.post('/additem',function(req,res){
  //   var msg="";

  //   con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
  //     if(err) throw err;
  //     console.log(result1[0].rid);

  //        var queryString1 = "INSERT INTO menu (itemname,description,price,sid,rid) VALUES (?,?,?,?,?)";    
  //        con.query(queryString1,[req.body.itemname,req.body.description,req.body.price,req.body.sid,result1[0].rid],function(error, results){
  //            if (error){
  //                console.log(error);
  //                msg="Could Not Add Item! :(";
  //                res.end(msg);
  //             }else {
  //               console.log("Addededded");
  //               msg="Item Added Successfully!" ;  
               
  //               res.end(msg);            
  //           }
  //         })
  //   });
  // })
    module.exports = router;