var express = require('express');
var router = express.Router();
let con=require('../../db');
var Cuisines=require('../../models/Cuisines');

router.get('/getCuisine',function(req,res){
  console.log("Inside Cuisine ");  
  var cuisineList=[];
  
      Cuisines.find({}, function(err,result,fields){
        if(err) throw err;
       
        for(var i=0;i<result.length;i++){
          cuisineList[i]=result[i].name;
        }
      res.writeHead(200,{
          'Content-Type' : 'application/json'
      });
  console.log(cuisineList);
  res.end(JSON.stringify(cuisineList));
  });
  })

//  router.get('/getCuisine',function(req,res){
//     console.log("Inside Cuisine ");  
//     var cuisineList=[];
    
//         con.query("SELECT * from cuisines", function(err,result,fields){
//           if(err) throw err;
         
//           for(var i=0;i<result.length;i++){
//             cuisineList[i]=result[i].name;
//           }
//         res.writeHead(200,{
//             'Content-Type' : 'application/json'
//         });
//     console.log(cuisineList);
//     res.end(JSON.stringify(cuisineList));
//     });
//     })
    module.exports = router;