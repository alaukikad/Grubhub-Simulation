var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../../kafka/client');

require('../../config/passport')(passport);

router.post('/getSentMessage',requireAuth,function(req,res){
  console.log("Inside get sent Message ");  
  console.log(req.body); 
  
let body = req.body;
console.log("Inside API of Get Sent Message ", body)
kafka.make_request('get_sent_message', body, function(err,result){
console.log(result); 
if (err){
      res.send("Errorrr!!")
  }else{
      res.send(result);
  }
});
  })  

    module.exports = router;