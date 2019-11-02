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

    router.post('/deleteSection',requireAuth,function(req,res){
      console.log("Inside Delete Selection ");  
      console.log(req.body);
      let body = req.body;
console.log("Inside API of Delete Section ", body)
kafka.make_request('delete_section', body, function(err,result){
console.log(result); 
if (err){
      res.send("Errorrr!!")
  }else{
      res.send(result);
  }
});

      // Sections.findOneAndDelete({_id : req.body.id},
      //   function (err, result) {
      // if (err) throw err;

      // Menu.deleteMany({rid:req.body.rid, sid:req.body.p},function (err, result) {
      //   if (err) throw err;
      // })

      //     res.writeHead(200,{
      //       'Content-Type' : 'application/json'
      //     });
  
      //     res.end("Section Deleted");
      //   });
        });



// router.post('/deleteSection',function(req,res){
//     console.log("Inside Delete Selection ");  
//     console.log(req.body);
//     var msg="";
//         con.query("DELETE from menu where sid="+req.body.id, function(err,result,fields){
//           if(err) throw err;

//           con.query("DELETE from sections where sid="+req.body.id, function(err,result,fields){
//             if(err) throw err;
         
//         res.writeHead(200,{
//           'Content-Type' : 'application/json'
//         });

//         res.end("Section Deleted");
//       });
//       });
//     })

    module.exports = router;