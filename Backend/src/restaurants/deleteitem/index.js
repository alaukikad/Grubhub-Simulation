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

  router.post('/deleteitem',requireAuth,function(req,res){
    console.log("Inside Delete Item ");  
    console.log(req.body);

    let body = req.body;
    console.log("Inside API of Delete Item", body)
    kafka.make_request('delete_item', body, function(err,result){
    console.log(result); 
    if (err){
          res.send("Errorrr!!")
      }else{
          res.send(result);
      }
    });

      //   Menu.findOneAndDelete({_id : req.body.id},function(err,result,fields){
      //     if(err) throw err;
         
      //   res.writeHead(200,{
      //     'Content-Type' : 'application/json'
      //   });

      //   res.end("Item Deleted");
      // });
    })

    // router.post('/deleteitem',function(req,res){
    //   console.log("Inside Delete Item ");  
    //   console.log(req.body);
    //   var msg="";
    //       con.query("DELETE from menu where mid="+req.body.id, function(err,result,fields){
    //         if(err) throw err;
           
    //       res.writeHead(200,{
    //         'Content-Type' : 'application/json'
    //       });
  
    //       res.end("Item Deleted");
    //     });
    //   })
  
    module.exports = router;