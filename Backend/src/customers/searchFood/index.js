var express = require('express');
var router = express.Router();
let con=require('../../../db');
var Restaurants=require('../../../models/Restaurants');
var Menu=require('../../../models/Menu');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

 router.post('/searchFood',requireAuth,function(req,res){
    console.log("Inside Search ");  
   
    let body = req.body;
    console.log("Inside API of Search Food", body)
    kafka.make_request('search_food', body, function(err,result){
      console.log(result); 
      if (err){
            res.send("Errorrr!!")
        }else{
            res.send(result);
        }
      })
    // let c=req.body.criteria;

    // if(c=="cuisine"){
        
    //     Restaurants.find({cuisine:req.body.searchFood}, function(err,result,fields){
    //       if(err) throw err;
    //         res.writeHead(200,{
    //            'Content-Type' : 'application/json'
    //         });
    //         console.log(result);
    //         res.end(JSON.stringify(result));
            
    //      })
    //     }else if(c=="zipcode"){
    //       Restaurants.find({zipcode:req.body.searchFood}, function(err,result1,fields){
    //         if(err) throw err;
            
    //           res.writeHead(200,{
    //             'Content-Type' : 'application/json'
    //          });
    //          console.log(result1);
    //         res.end(JSON.stringify(result1));
          
    //     })
    //     }else if(c=="foodItem"){
    //      Menu.find({itemname : req.body.searchFood},function(err,result,fields){
    //        if(err) throw err
    //        res.writeHead(200,{
    //         'Content-Type' : 'application/json'
    //     });
    //     console.log(result);
    //     res.end(JSON.stringify(result));
    //      })
    //     }
    //     else if(c=="restaurant"){
    //       Restaurants.find({name:req.body.searchFood}, function(err,result1,fields){
    //         if(err) throw err;
           
    //       res.writeHead(200,{
    //           'Content-Type' : 'application/json'
    //       });
    //       console.log(result1);
    //       res.end(JSON.stringify(result1));
          
    //       })
    // }
  })

  // router.post('/searchFood',function(req,res){
  //   console.log("Inside Search ");  
  //   let c=req.body.criteria;

  //   if(c=="cuisine"){
  //       con.query("SELECT * from restaurants where cuisine='"+req.body.searchFood+"'", function(err,result,fields){
  //         if(err) throw err;
  //           res.writeHead(200,{
  //              'Content-Type' : 'application/json'
  //           });
  //           console.log(result);
  //           res.end(JSON.stringify(result));
            
  //        })
  //       }else if(c=="zipcode"){
  //         con.query("SELECT * from restaurants where zipcode="+req.body.searchFood, function(err,result1,fields){
  //           if(err) throw err;
            
  //             res.writeHead(200,{
  //               'Content-Type' : 'application/json'
  //            });
  //            console.log(result1);
  //           res.end(JSON.stringify(result1));
          
  //       })
  //       }else if(c=="foodItem"){
  //         con.query("SELECT * from menu NATURAL JOIN restaurants where itemname='"+req.body.searchFood+"'", function(err,result,fields){
  //           if(err) throw err;

  //           res.writeHead(200,{
  //             'Content-Type' : 'application/json'
  //          });
  //          console.log(result);
  //         res.end(JSON.stringify(result));
  //         })
  //       }else if(c=="restaurant"){
  //         con.query("SELECT * from restaurants where name='"+req.body.searchFood+"'", function(err,result1,fields){
  //           if(err) throw err;
           
  //         res.writeHead(200,{
  //             'Content-Type' : 'application/json'
  //         });
  //         console.log(result1);
  //         res.end(JSON.stringify(result1));
          
  //         })
  //   }
  // })

    module.exports = router;