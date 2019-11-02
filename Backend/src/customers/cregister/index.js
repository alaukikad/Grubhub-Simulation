var express = require('express');
var router = express.Router();
let con=require('../../../db')
const bcrypt =require('bcryptjs');
const saltRounds =10;
var Users=require('../../../models/Users');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('../../../config/settings');
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

router.post('/cregister',function(req,res){
  let body = req.body;
  console.log("Inside API of C register", body)
  kafka.make_request('cregister', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
        res.send(result);
      }
  // var user=Users({
  //   name:req.body.fullname,
  //   email:req.body.email,
  //   contact:req.body.contact,
  //   address:req.body.address
  // })

  // Users.find({  }, function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   console.log(req.body.email)
    
  //   for(var i=0;i<result.length;i++){
  //      if(req.body.email==result[i].email){
  //           found=true;
  //           break;
  //         }
  //       }
  //      console.log(found);
  //     if(found){
  //       msg="Email Already in Use!"
  //       res.end(msg);
  //     }else{
  //       bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  //                       user.password=hash;
  //                           
  //                       user.save(function(error, results) 
  //                       {
  //                           if (error) 
  //                           {
  //                               console.log("alaukika:P");
  //                               console.log(error);
  //                               msg="error";

  //                             var pkg={
  //                                 resmsg: msg
  //                               }

  //                               res.end(JSON.stringify(pkg));
  //                           }     
  //                           else      
  //                           {       
         
  //                            res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
  //                            res.cookie("user",req.body.fullname,{maxAge: 900000, httpOnly: false, path : '/'});                     
  //                            res.cookie("email",req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
  //                                          
  //                           msg="User Added Successfully!";

  //                           var token={
  //                             email: req.body.email,
  //                             user: "customer"
  //                           }
                             
  //                            var signed_token = jwt.sign(token, config.secret, {
  //                                  expiresIn: 86400 // in seconds
  //                              });
                         
  //                             var pkg={
  //                               resmsg: msg,
  //                               token : signed_token
  //                             } 
  //                              res.end(JSON.stringify(pkg));
                    
  //                           }       
  //                       });       
  //                   });
        
       
      //  }

});
      // con.query("SELECT email from users", function(err,result,fields){
      //  if(err) throw err;
       
      // });  
  });

//  router.post('/cregister',function(req,res){
//     var found=false;
//     var msg="";
//         con.query("SELECT email from users", function(err,result,fields){
//          if(err) throw err;
//          console.log(result);
//          console.log(req.body.email)
//          for(var i=0;i<result.length;i++){
//          if(req.body.email==result[i].email){
//               found=true;
//               break;
//             }
//           }
//          console.log(found);
//         if(found){
//           msg="Email Already in Use!"
//           res.end(msg);
//         }else{
//           bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//                           var queryString1 = "INSERT INTO users (name,email,password,contact,address) VALUES (?,?,?,?,?)";    
//                           con.query(queryString1,[req.body.fullname,req.body.email,hash,req.body.contact,req.body.address],function(error, results) 
//                           {
//                               if (error) 
//                               {
//                                   console.log("alaukika:P");
//                                   console.log(error);
//                                   msg="error";
//           res.end(msg);
//                               }     
//                               else      
//                               {       
           
//                                res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
//                                res.cookie("user",req.body.fullname,{maxAge: 900000, httpOnly: false, path : '/'});                     
//                                res.cookie("email",req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
//           //                       res.writeHead(200, {      
//           //                             "Content-Type": "text/plain"      
//           //                           });
//                                     //res.end("Restaurant Added Successfully!");                   
//                               msg="User Added Successfully!";
//                               res.end(msg);
//                               }       
//                           });       
//                       });
//           ///
//           // var sql = "INSERT INTO restaurants (name,email,password,oname,contact, address,city,zipcode) VALUES ('"+req.body.restaurant+"', '"+req.body.email+"', '"+req.body.password+"','"+req.body.fullname+"', "+req.body.contact+", '"+req.body.address+"','"+req.body.city+"', "+req.body.zipcode+")";
//           // con.query(sql, function (err, result) {
//           //   if (err){
//           //      throw new Error("Duplicate Entries");
//           //   }else{
//           //   msg="Restaurant Added Successfully!"
//           //   console.log(msg);
         
//           }
//         });  
//     });

    module.exports = router;