var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Restaurants=require('../../../models/Restaurants');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});

//router.use(requireAuth);

require('../../../config/passport')(passport);

  router.post('/rprofile',requireAuth,function(req,res){
    console.log("Inside Restaurant Profile");  
    console.log(req.body);
    var found=false;
    Restaurants.find({email : req.body.email}, function(err,result,fields){
      if(err) throw err;
         
        res.writeHead(200,{
          'Content-Type' : 'application/json'
        });
        console.log("Restaurant : ",JSON.stringify(result[0]));
        res.end(JSON.stringify(result[0]));
      });
    })
    
    // router.post('/rprofile',function(req,res){
    //   console.log("Inside Restaurant Profile");  
    //   console.log(req.body);
    //   var found=false;
    //       con.query("SELECT * from restaurants where email='"+req.body.email+"'", function(err,result,fields){
    //         if(err) throw err;
           
    //       res.writeHead(200,{
    //         'Content-Type' : 'application/json'
    //       });
    //       console.log("Restaurant : ",JSON.stringify(result[0]));
    //       res.end(JSON.stringify(result[0]));
    //     });
    //   })

    module.exports = router;