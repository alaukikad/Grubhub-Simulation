var express = require('express');
var router = express.Router();
let con=require('../../../db')
const bcrypt =require('bcryptjs');
const saltRounds =10;
var Restaurants=require('../../../models/Restaurants');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../../../config/settings');
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

  router.post('/rregister',function(req,res){
    console.log("Inside Restaurant register");

  let body = req.body;
  console.log("Inside API of Restaurant register", body)
  kafka.make_request('rregister', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
          res.send(result);
      }
  });
    // var found=false;
    // var msg="";
    // var restaurant=Restaurants({
    //   name:req.body.restaurant,
    //   email:req.body.email,
    //   oname :req.body.fullname,
    //   contact:req.body.contact,
    //   address:req.body.address,
    //   city:req.body.city,
    //   zipcode:req.body.zipcode,
    //   cuisine:req.body.cuisine
    // })  
    //   Restaurants.find({}, function(err,result,fields){
    //      if(err) throw err;
    //      console.log(result);
    //      console.log(req.body.email)
    //       for(var i=0;i<result.length;i++){
    //         if(req.body.email==result[i].email){
    //           found=true;
    //           break;
    //         }
    //       }
    //      console.log(found);
    //     if(found){
    //       msg="Email Already in Use!"
    //       res.end(msg);
    //     }else{
    //       bcrypt.hash(req.body.password, saltRounds, function(err, hash) 
    //                   {
    //                       restaurant.password=hash;
    //                       restaurant.save(function(error, results){
    //                           if (error){
    //                               console.log(error);
    //                               msg="error";
    //                               var pkg={
    //                                 resmsg: msg
    //                               }
    //                               res.end(JSON.stringify(pkg));
    //                           }else {
    //                             res.cookie('cookie',"restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
    //                             res.cookie("user",req.body.restaurant,{maxAge: 900000, httpOnly: false, path : '/'});                      
    //                             res.cookie("email",req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
    //                             console.log("Howdyyy");
    //                             msg="Restaurant Added Successfully!" ;  
    //                             var token={
    //                               email: req.body.email,
    //                               user: "customer"
    //                              }
           
    //                             var signed_token = jwt.sign(token, config.secret, {
    //                                 expiresIn: 86400 // in seconds
    //                              });
       
    //                            var pkg={
    //                            resmsg: msg,
    //                            token : signed_token
    //                             } 
    //                             res.end(JSON.stringify(pkg));          
    //                             }
    //                       });
    //                   });
    //       }
    //     });
    });
 

  // router.post('/rregister',function(req,res){
  //   var found=false;
  //   var msg="";
  //       con.query("SELECT email from restaurants", function(err,result,fields){
  //         if(err) throw err;
  //        console.log(result);
  //        console.log(req.body.email)
  //         for(var i=0;i<result.length;i++){
  //           if(req.body.email==result[i].email){
  //             found=true;
  //             break;
  //           }
  //         }
  //        console.log(found);
  //       if(found){
  //         msg="Email Already in Use!"
  //         res.end(msg);
  //       }else{
  //         bcrypt.hash(req.body.password, saltRounds, function(err, hash) 
  //                     {
  //                         var queryString1 = "INSERT INTO restaurants (name,email,password,oname,contact, address,city,zipcode,cuisine) VALUES (?,?,?,?,?,?,?,?,?)";    
  //                         con.query(queryString1,[req.body.restaurant,req.body.email,hash,req.body.fullname,req.body.contact,req.body.address,req.body.city,req.body.zipcode,req.body.cuisine],function(error, results){
  //                             if (error){
  //                                 console.log(error);
  //                                 msg="error";
  //                                 res.end(msg);
  //                             }else {
  //                               res.cookie('cookie',"restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
  //         res.cookie("user",req.body.restaurant,{maxAge: 900000, httpOnly: false, path : '/'});                      
  //         res.cookie("email",req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
  //                               console.log("Howdyyy");
  //                               msg="Restaurant Added Successfully!" ;  
  //                               res.end(msg);            
  //                               }
  //                         });
  //                     });
  //         ///
  //         // var sql = "INSERT INTO restaurants (name,email,password,oname,contact, address,city,zipcode) VALUES ('"+req.body.restaurant+"', '"+req.body.email+"', '"+req.body.password+"','"+req.body.fullname+"', "+req.body.contact+", '"+req.body.address+"','"+req.body.city+"', "+req.body.zipcode+")";
  //         // con.query(sql, function (err, result) {
  //         //   if (err){
  //         //      throw new Error("Duplicate Entries");
  //         //   }else{
  //         //   msg="Restaurant Added Successfully!"
  //         //   console.log(msg);
  //           //res.end(msg);
  //         }
  //       });
  //   });
    module.exports = router;