var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Users=require('../../../models/Users');

router.post('/cprofileupdate',function(req,res){
  
  console.log("Inside Customer Profile Update");  
  console.log(req.body);   
  Users.findOneAndUpdate({email : req.body.pemail}, 
    {
    name : req.body.fullname,
    address:req.body.address,
    contact :req.body.contact,
    email :req.body.email
  },
    function(err, result) {
     if (err) throw err;
 
    console.log(result.affectedRows + " record(s) updated");
    res.end("Details Updated!");
    });
})
  // router.post('/cprofileupdate',function(req,res){
  //   console.log("Inside Customer Profile Update");  
  //   console.log(req.body);   
  //         var sql = "UPDATE users SET name=?,address=?,contact=?,image=? WHERE email='"+req.body.pemail+"'";
  //         con.query(sql,[req.body.fullname,req.body.address,req.body.contact,req.body.oimage] ,function (err, result) {
  //           if (err) throw err;
  //           console.log(req.body.oimage);
  //           console.log(result.affectedRows + " record(s) updated");
  //           res.end("Details Updated!");
  //         });
  //   })

    module.exports = router;  