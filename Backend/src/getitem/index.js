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


  router.post('/getitem',requireAuth,function(req,res){
    console.log("Inside Get Item ");  
    console.log(req.body);   
    let body = req.body;
    console.log("Inside API of get Item ", body)
    kafka.make_request('get_item', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
          res.send(result);
      }
    })
    // Menu.find({_id:req.body.id},function(err,result,fields){
    //   if(err) throw err;
    //         res.end(JSON.stringify(result[0]));
    // })
  })

  // router.post('/getitem',function(req,res){
  //   console.log("Inside Get Item ");  
  //   console.log(req.body);   

  //   con.query("SELECT * from menu NATURAL JOIN sections where mid="+req.body.id, function(err,result,fields){
  //     if(err) throw err;
  //           res.end(JSON.stringify(result[0]));
  //         });
  // })

    module.exports = router;