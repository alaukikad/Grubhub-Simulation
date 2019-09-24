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
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

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
  host: "localhost",
  user: "root",
  password: "password",
  database:"grubhubapp"
});

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });





app.post('/login',function(req,res){
  var found=false;
      con.query("SELECT email,password from users", function(err,result,fields){
        if(err) throw err;
        var msg="";
        let cust_data = result;
        let flag = false;
        let passwordInDb="";
        cust_data.forEach(element => {
        if(req.body.username==element.email){
          flag=true;
          passwordInDb=element.password;
          }
        });
          bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
            if (resp) 
            {
            console.log("alalsk");
            res.cookie("cookie","customer",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.username;
            msg="Login Successful"  
            }else{
      //console.log("I ma here");
      msg="Invalid credentials"
      }
    res.end(msg)
  });
  })
})


  app.get('/rprofile',function(req,res){
    console.log("Inside Restaurant Profile");  
    var found=false;
        con.query("SELECT * from restaurants where email='joe@joe.com'", function(err,result,fields){
          if(err) throw err;
         
  res.writeHead(200,{
      'Content-Type' : 'application/json'
  });
  console.log("Restaurant : ",JSON.stringify(result[0]));
  res.end(JSON.stringify(result[0]));
      });

    })


app.post('/rlogin',function(req,res){
  var found=false;
      con.query("SELECT email,password from restaurants", function(err,result,fields){
        if(err) throw err;

        var msg="";
       // console.log(result);
        //console.log(req.body.username);
        //console.log(req.body.password);
        //console.log(found);
        
        let cust_data = result;
        let flag = false;
        let passwordInDb="";
        cust_data.forEach(element => {
            if(req.body.username==element.email){
            flag=true;
            passwordInDb=element.password;
            };
        });
          bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
            if (resp) 
            {
            console.log("kdsl");
            res.cookie("cookie","customer",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.username;
            msg="Login Successful"  
           }else{
           //console.log("I ma here");
           msg="Invalid credentials"
            }
           res.end(msg)});
        })
    })
  



app.post('/rregister',function(req,res){
  var found=false;
  var msg="";
      con.query("SELECT email from restaurants", function(err,result,fields){
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
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) 
                    {
                        var queryString1 = "INSERT INTO restaurant (name,email,password,oname,contact, address,city,zipcode) VALUES (?,?,?,?,?)";    
                        con.query(queryString1,[req.body.restaurant,req.body.email,req.body.password,req.body.fullname,req.body.contact,req.body.address,req.body.city,req.body.zipcode],function(error, results){
                            if (error){
                                console.log("alaukikaa");
                                msg="error";
                            }else {
                              res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
                              msg="Restaurant Added Successfully!" ;                }
        
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
          res.end(msg);
        }
      });
  });

  

app.post('/cregister',function(req,res){
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
                            }     
                            else      
                            {       
                              res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
        //                       res.writeHead(200, {      
        //                             "Content-Type": "text/plain"      
        //                           });
                                  //res.end("Restaurant Added Successfully!");                   
                            msg="User Added Successfully!";
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
        res.end(msg);
        }
      });  
  });

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");