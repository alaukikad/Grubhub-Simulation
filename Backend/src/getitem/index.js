var express = require('express');
var router = express.Router();
let con=require('../../db');
var Menu=require('../../models/Menu');

  router.post('/getitem',function(req,res){
    console.log("Inside Get Item ");  
    console.log(req.body);   

    Menu.find({_id:req.body.id},function(err,result,fields){
      if(err) throw err;
            res.end(JSON.stringify(result[0]));
    })
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