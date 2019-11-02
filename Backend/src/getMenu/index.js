var express = require('express');
var router = express.Router();
let con=require('../../db');
var Menu=require('../../models/Menu');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../kafka/client');

//router.use(requireAuth);

require('../../config/passport')(passport);

 router.post('/getMenu',requireAuth,function(req,res){
    console.log("Inside Menu ");  
    console.log(req.body.email);
        
    let body = req.body;
  console.log("Inside API of get Menu ", body)
  kafka.make_request('get_menu', body, function(err,result){
  console.log(result); 
  if (err){
        res.send("Errorrr!!")
    }else{
        res.send(result);
    }
  });

    // Menu.find({email:req.body.email}, function(err,result,fields){
    //         if(err) throw err;

    //     res.writeHead(200,{
    //         'Content-Type' : 'application/json'
    //     });
    // console.log(result);
    // res.end(JSON.stringify(result));
    //       })
    
    })
    

    // router.post('/getMenu',function(req,res){
    //     console.log("Inside Menu ");  
    //     console.log(req.body.email);
    //         con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
    //           if(err) throw err;
             
    //           console.log(result1[0].rid);
    //           con.query("SELECT * from menu m, sections s where m.sid=s.sid && m.rid="+result1[0].rid, function(err,result,fields){
    //             if(err) throw err;
    
    //         res.writeHead(200,{
    //             'Content-Type' : 'application/json'
    //         });
    //     console.log(result);
    //     res.end(JSON.stringify(result));
    //           })
    //     });
    //     })
        

    module.exports = router;