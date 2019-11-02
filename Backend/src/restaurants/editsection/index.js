var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Sections=require('../../../models/Sections');
var Menu=require('../../../models/Menu');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

 router.post('/editsection',requireAuth,function(req,res){
    console.log("Inside Edit Section ");  
    console.log(req.body);   

    let body = req.body;
    console.log("Inside API of edit section", body)
    kafka.make_request('edit_section', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
          res.send(result);
      }
    });

          //   Sections.findOneAndUpdate({_id : req.body.id},{
          //     name:req.body.name
          //   },function (err, result) {
          //   if (err) throw err;

          //   Menu.updateMany({rid:req.body.rid, sid:req.body.p},{sid:req.body.name},function (err, result) {
          //     if (err) throw err;
          //   })
          //   console.log(result.affectedRows + " record(s) updated");
          //   res.end("Section Updated!");
          // });
    }) 

    // router.post('/editsection',function(req,res){
    //   console.log("Inside Edit Section ");  
    //   console.log(req.body);   
  
    //         var sql = "UPDATE sections SET name=? WHERE sid="+req.body.id;
    //         con.query(sql,[req.body.name],function (err, result) {
    //           if (err) throw err;
  
    //           console.log(result.affectedRows + " record(s) updated");
    //           res.end("Section Updated!");
    //         });
    //   }) 

    module.exports = router;