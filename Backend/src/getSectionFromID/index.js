var express = require('express');
var router = express.Router();
let con=require('../../db');
var Sections=require('../../models/Sections');

 router.post('/getSectionFromID',function(req,res){
    console.log("Inside Section ID ");  
    console.log(req.body.id);
      
    Sections.find({_id:req.body.id}, function(err,result,fields){
            if(err) throw err;
             
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
    
    res.end(result[0].name);
          })    
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