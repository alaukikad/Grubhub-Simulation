var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Menu=require('../../../models/Menu');

  router.post('/deleteitem',function(req,res){
    console.log("Inside Delete Item ");  
    console.log(req.body);

        Menu.findOneAndDelete({_id : req.body.id},function(err,result,fields){
          if(err) throw err;
         
        res.writeHead(200,{
          'Content-Type' : 'application/json'
        });

        res.end("Item Deleted");
      });
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