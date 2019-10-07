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
connectionLimit:20,
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


router.post('/login',function(req,res){
  var found=false;
  console.log(req.body)
      con.query("SELECT email,password,name from users", function(err,result,fields){
        if(err) throw err;
        var msg="";
        var uname;
        let cust_data = result;
        let flag = false;
        let passwordInDb="";
        cust_data.forEach(element => {
        if(req.body.username==element.email){
          flag=true;
          uname=element.name;
          passwordInDb=element.password;
          }
        });
          bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
            if (resp) 
            {
            console.log("alalsk");
            res.cookie("cookie","customer",{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie("user",uname,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie("email",req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.username;
            msg="Login Successful"  
            }else{
      
      msg="Invalid credentials"
      }
   
      res.end(msg);
     
  });
  })
})

module.exports = router;