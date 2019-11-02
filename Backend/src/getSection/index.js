var express = require('express');
var router = express.Router();
let con=require('../../db');
var Sections=require('../../models/Sections');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../kafka/client');

//router.use(requireAuth);

require('../../config/passport')(passport);

router.post('/getSection',requireAuth,function(req,res){
  console.log("Inside Section ");  
 
  //console.log(req.body.email);
  let body = req.body;
  console.log("Inside API of get Section ", body)
  kafka.make_request('get_section', body, function(err,result){
  console.log(result); 
  if (err){
        res.send("Errorrr!!")
    }else{
        res.send(result);
    }
  });
  //      Sections.find({rid:req.body.email}, function(err,result,fields){
  //         if(err) throw err;
         
  //         let a=[]
  //         for(var i=0;i<result.length;i++){
  //           a.push({"key" : result[i]._id,"value" :result[i].name} )
  //         }

  //     res.writeHead(200,{
  //         'Content-Type' : 'application/json'
  //     });
  // res.end(JSON.stringify(a));  
  //});
  })

  // router.post('/getSection',function(req,res){
  //   console.log("Inside Section ");  
   
  //   console.log(req.body.email);
  //       con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
  //         if(err) throw err;
          
  //         console.log(result1[0].rid);
  //         con.query("SELECT * from sections where rid="+result1[0].rid, function(err,result,fields){
  //           if(err) throw err;
           
  //           let a=[]
  //           for(var i=0;i<result.length;i++){
            
  //             a.push({"key" : result[i].sid,"value" :result[i].name} )
  //           }

  //       res.writeHead(200,{
  //           'Content-Type' : 'application/json'
  //       });
    
  //   res.end(JSON.stringify(a));
  //         })
  //   });
  //   })

    module.exports = router;