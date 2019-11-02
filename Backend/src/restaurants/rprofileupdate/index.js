var express = require('express');
var router = express.Router();
let con=require('../../../db')
var Restaurants=require('../../../models/Restaurants');
var Menu=require('../../../models/Menu');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../../kafka/client');

//router.use(requireAuth);

require('../../../config/passport')(passport);

router.post('/rprofileupdate',requireAuth,function(req,res){
  console.log("Inside Restaurant Profile Update");  
  console.log(req.body);   

  let body = req.body;
console.log("Inside API of Rprofile Update", body)
kafka.make_request('rprofile_update', body, function(err,result){
console.log(result); 
if (err){
      res.send("Errorrr!!")
  }else{
      res.send(result);
  }
});

//   Restaurants.findOneAndUpdate({email : req.body.pemail}, 
//     {
//     name : req.body.restaurant,
//     address:req.body.address,
//     contact :req.body.contact,
//     email :req.body.email,
//     city:req.body.city,
//     zipcode:req.body.zipcode,
//     oname:req.body.fullname,
//     cuisine:req.body.cuisine
//   },
//   function (err, result) {
//           if (err) throw err;
//   })
//   Menu.updateMany({rid : req.body.pemail}, 
//     {
//     name : req.body.restaurant,
//     address:req.body.address,
//     cuisine:req.body.cuisine
//   },
//   function (err, result) {
//     if (err) throw err;

//     console.log(result.affectedRows + " record(s) updated");
// });
          
//           res.end("Details Updated!");
       
  })

//  router.post('/rprofileupdate',function(req,res){
//     console.log("Inside Restaurant Profile1");  
//     console.log(req.body);   
//           var sql = "UPDATE restaurants SET name=?,address=?,contact=?,city=?,zipcode=?,oname=?,oimage=?,rimage=?,cuisine=? WHERE email='"+req.body.pemail+"'";
//           con.query(sql,[req.body.restaurant,req.body.address,req.body.contact,req.body.city,req.body.zipcode,req.body.fullname,req.body.oimage,req.body.rimage,req.body.cuisine] ,function (err, result) {
//             if (err) throw err;
            
//             console.log(result.affectedRows + " record(s) updated");
//             res.end("Details Updated!");
//           });
//     })
    module.exports = router;