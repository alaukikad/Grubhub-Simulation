//import the require dependencies
var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Users=require('../../../models/Users');


router.post('/cprofile',function(req,res){
    console.log("Inside Customer Profile");  
    console.log(req.body);
    var found=false;
      Users.find({email : req.body.email}, function(err,result,fields){
          if(err) throw err;
         
  res.writeHead(200,{
      'Content-Type' : 'application/json'
  });
  console.log("User : ",JSON.stringify(result[0]));
  res.end(JSON.stringify(result[0]));
      });
  
    })


//  router.post('/cprofile',function(req,res){
//     console.log("Inside Customer Profile");  
//     console.log(req.body);
//     var found=false;
//         con.query("SELECT * from users where email='"+req.body.email+"'", function(err,result,fields){
//           if(err) throw err;
         
//   res.writeHead(200,{
//       'Content-Type' : 'application/json'
//   });
//   console.log("User : ",JSON.stringify(result[0]));
//   res.end(JSON.stringify(result[0]));
//       });
  
//     })

module.exports = router;