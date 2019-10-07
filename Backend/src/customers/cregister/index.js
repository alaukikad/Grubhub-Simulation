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

 router.post('/cregister',function(req,res){
    var found=false;
    var msg="";
        con.query("SELECT email from users", function(err,result,fields){
         if(err) throw err;
         console.log(result);
         console.log(req.body.email)
         for(var i=0;i<result.length;i++){
         if(req.body.email==result[i].email){
              found=true;
              break;
            }
          }
         console.log(found);
        if(found){
          msg="Email Already in Use!"
          res.end(msg);
        }else{
          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                          var queryString1 = "INSERT INTO users (name,email,password,contact,address) VALUES (?,?,?,?,?)";    
                          con.query(queryString1,[req.body.fullname,req.body.email,hash,req.body.contact,req.body.address],function(error, results) 
                          {
                              if (error) 
                              {
                                  console.log("alaukika:P");
                                  console.log(error);
                                  msg="error";
          res.end(msg);
                              }     
                              else      
                              {       
           
                               res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
                               res.cookie("user",req.body.fullname,{maxAge: 900000, httpOnly: false, path : '/'});                     
                               res.cookie("email",req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
          //                       res.writeHead(200, {      
          //                             "Content-Type": "text/plain"      
          //                           });
                                    //res.end("Restaurant Added Successfully!");                   
                              msg="User Added Successfully!";
                              res.end(msg);
                              }       
                          });       
                      });
          ///
          // var sql = "INSERT INTO restaurants (name,email,password,oname,contact, address,city,zipcode) VALUES ('"+req.body.restaurant+"', '"+req.body.email+"', '"+req.body.password+"','"+req.body.fullname+"', "+req.body.contact+", '"+req.body.address+"','"+req.body.city+"', "+req.body.zipcode+")";
          // con.query(sql, function (err, result) {
          //   if (err){
          //      throw new Error("Duplicate Entries");
          //   }else{
          //   msg="Restaurant Added Successfully!"
          //   console.log(msg);
         
          }
        });  
    });

    module.exports = router;