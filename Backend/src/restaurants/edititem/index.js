var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Menu=require('../../../models/Menu');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

  router.post('/edititem',requireAuth,function(req,res){
    console.log("Inside Edit Item ");  
    console.log(req.body);   
    console.log(req.body.id)
    Menu.findOneAndUpdate({_id : req.body.id},{
      itemname:req.body.itemname,
      desc:req.body.description,
      price:req.body.price,
      sid:req.body.sid
    },function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            res.end("Details Updated!");
          });
       
    })
    
    // router.post('/edititem',function(req,res){
    //   console.log("Inside Edit Item ");  
    //   console.log(req.body);   
  
    //         var sql = "UPDATE menu SET itemname=?,image=?,description=?,price=?,sid=? WHERE mid="+req.body.id;
    //         con.query(sql,[req.body.itemname,req.body.image,req.body.description,req.body.price,req.body.sid] ,function (err, result) {
    //           if (err) throw err;
    //           console.log(result.affectedRows + " record(s) updated");
    //           res.end("Details Updated!");
    //         });
         
    //   })
  
    module.exports = router;