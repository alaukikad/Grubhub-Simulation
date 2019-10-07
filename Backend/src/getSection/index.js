//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var mysql=require('mysql');
const bcrypt =require('bcryptjs');
const saltRounds =10;
var router = express.Router();
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://54.196.229.70:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());


var con = mysql.createPool({
  connectionLimit: 10,
  host: "database-1d.cba9kabwgk3a.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database:"grubhubapp"
});

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://54.196.229.70:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  router.post('/getSection',function(req,res){
    console.log("Inside Section ");  
   
    console.log(req.body.email);
        con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
          if(err) throw err;
          
          console.log(result1[0].rid);
          con.query("SELECT * from sections where rid="+result1[0].rid, function(err,result,fields){
            if(err) throw err;
           
            let a=[]
            for(var i=0;i<result.length;i++){
            
              a.push({"key" : result[i].sid,"value" :result[i].name} )
            }

        res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
    
    res.end(JSON.stringify(a));
          })
    });
    })

    module.exports = router;