var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Sections=require('../../../models/Sections');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

router.post('/addsection',requireAuth,function(req,res){
  console.log("Inside Add Section ");  
  console.log(req.body); 
  
let body = req.body;
console.log("Inside API of Add Section", body)
kafka.make_request('add_section', body, function(err,result){
console.log(result); 
if (err){
      res.send("Errorrr!!")
  }else{
      res.send(result);
  }
});

    // var msg="";
    // var found=false;
    // var section=Sections({
    //   name:req.body.sectionname,
    //   rid:req.body.email
    // }) 

    // Sections.find({rid:req.body.email}, function(err,result,fields){
    //   if(err) throw err;
    //   console.log(result);
    //    for(var i=0;i<result.length;i++){
    //      if(req.body.sectionname==result[i].name){
    //        found=true;
    //        break;
    //      }
    //    }
    //   console.log(found);
    //  if(found){
    //    msg="Section Already Exists!"
    //    res.end(msg);
    //  }else{
    //   section.save(function(error, results){
             
    //       if (error){
    //              console.log(error);
    //              msg="Could Not Add Section! :(";
    //              res.end(msg);
    //           }else {
    //             console.log("Addededded");
    //             msg="Section Added Successfully!" ;  
    //             res.end(msg);            
    //           }
    //         })
    //       }
    //       })
  })  

  // router.post('/addsection',function(req,res){
  //   var msg="";
  //   con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
  //     if(err) throw err;
  //     console.log(result1[0].rid);

  //        var queryString1 = "INSERT INTO sections (name,rid) VALUES (?,?)";    
  //        con.query(queryString1,[req.body.sectionname,result1[0].rid],function(error, results){
  //            if (error){
  //                console.log(error);
  //                msg="Could Not Add Section! :(";
  //                res.end(msg);
  //             }else {
  //               console.log("Addededded");
  //               msg="Section Added Successfully!" ;  
  //               res.end(msg);            
  //             }
  //           })
  //        })
  // })  


    module.exports = router;