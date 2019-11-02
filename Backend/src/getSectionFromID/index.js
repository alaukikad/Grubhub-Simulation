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

 router.post('/getSectionFromID',requireAuth,function(req,res){
    console.log("Inside Section ID ");  
    console.log(req.body.id);
    let body = req.body;
    console.log("Inside API of get Section from id ", body)
    kafka.make_request('get_section_from_id', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
          res.send(result);
      }
    });
    // Sections.find({_id:req.body.id}, function(err,result,fields){
    //         if(err) throw err;
             
    //     res.writeHead(200,{
    //         'Content-Type' : 'application/json'
    //     });
    
    // res.end(result[0].name);
    //       })    
})

// router.post('/getSectionFromID',function(req,res){
//     console.log("Inside Section ID ");  
   
//     console.log(req.body.id);
      
//           con.query("SELECT name from sections where sid="+req.body.id, function(err,result,fields){
//             if(err) throw err;
             
//         res.writeHead(200,{
//             'Content-Type' : 'application/json'
//         });
    
//     res.end(result[0].name);
//           })    
// })
    module.exports = router;