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
      //console.log("I ma here");
      msg="Invalid credentials"
      }
    res.end(msg)
  });
  })
})


app.post('/cprofileupdate',function(req,res){
  console.log("Inside Customer Profile");  
  console.log(req.body);   
        var sql = "UPDATE users SET name=?,address=?,contact=?,image=? WHERE email='"+req.body.pemail+"'";
        con.query(sql,[req.body.fullname,req.body.address,req.body.contact,req.body.oimage] ,function (err, result) {
          if (err) throw err;
          console.log(req.body.oimage);
          console.log(result.affectedRows + " record(s) updated");
          res.end("Details Updated!");
        });
  })


  app.post('/edititem',function(req,res){
    console.log("Inside Edit Item ");  
    console.log(req.body);   

    con.query("SELECT sid from sections where name='"+req.body.section+"'", function(err,result1,fields){
      if(err) throw err;

          var sql = "UPDATE menu SET itemname=?,image=?,description=?,price=?,sid=? WHERE mid="+req.body.id;
          con.query(sql,[req.body.itemname,req.body.image,req.body.description,req.body.price,result1[0]] ,function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            res.end("Details Updated!");
          });
        })
    })

    app.post('/getitem',function(req,res){
      console.log("Inside Get Item ");  
      console.log(req.body);   
  
      con.query("SELECT * from menu NATURAL JOIN sections where mid="+req.body.id, function(err,result,fields){
        if(err) throw err;
              res.end(JSON.stringify(result[0]));
            });
    })
      
  

app.post('/rprofileupdate',function(req,res){
  console.log("Inside Restaurant Profile1");  
  console.log(req.body);   
        var sql = "UPDATE restaurants SET name=?,address=?,contact=?,city=?,zipcode=?,oname=?,oimage=?,rimage=?,cuisine=? WHERE email='"+req.body.pemail+"'";
        con.query(sql,[req.body.restaurant,req.body.address,req.body.contact,req.body.city,req.body.zipcode,req.body.fullname,req.body.oimage,req.body.rimage,req.body.cuisine] ,function (err, result) {
          if (err) throw err;
          
          console.log(result.affectedRows + " record(s) updated");
          res.end("Details Updated!");
        });
  })


  app.post('/rprofile',function(req,res){
    console.log("Inside Restaurant Profile");  
    console.log(req.body);
    var found=false;
        con.query("SELECT * from restaurants where email='"+req.body.email+"'", function(err,result,fields){
          if(err) throw err;
         
        res.writeHead(200,{
          'Content-Type' : 'application/json'
        });
        console.log("Restaurant : ",JSON.stringify(result[0]));
        res.end(JSON.stringify(result[0]));
      });
    })


    app.post('/deleteitem',function(req,res){
      console.log("Inside Delete Item ");  
      console.log(req.body);
      var msg="";
          con.query("DELETE from menu where mid="+req.body.id, function(err,result,fields){
            if(err) throw err;
           
          res.writeHead(200,{
            'Content-Type' : 'application/json'
          });

          res.end("Item Deleted");
        });
      })


    app.get('/getCuisine',function(req,res){
      console.log("Inside Cuisine ");  
      var cuisineList=[];
      
          con.query("SELECT * from cuisines", function(err,result,fields){
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


      app.post('/getMenu',function(req,res){
        console.log("Inside Menu ");  
        console.log(req.body.email);
            con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
              if(err) throw err;
             
              console.log(result1[0].rid);
              con.query("SELECT * from menu where rid="+result1[0].rid, function(err,result,fields){
                if(err) throw err;

            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
        console.log(result);
        res.end(JSON.stringify(result));
              })
        });
        })

       

        app.post('/searchFood',function(req,res){
          console.log("Inside Search ");  
          let c=req.body.criteria;
// console.log(c);
// console.log(req.body.searchFood);
          if(c=="cuisine"){
              con.query("SELECT * from restaurants where cuisine='"+req.body.searchFood+"'", function(err,result,fields){
                if(err) throw err;
                  res.writeHead(200,{
                     'Content-Type' : 'application/json'
                  });
                  console.log(result);
                  res.end(JSON.stringify(result));
                  
               })
              }else if(c=="zipcode"){
                con.query("SELECT * from restaurants where zipcode="+req.body.searchFood, function(err,result1,fields){
                  if(err) throw err;
                  
                    res.writeHead(200,{
                      'Content-Type' : 'application/json'
                   });
                   console.log(result);
                  res.end(JSON.stringify(result));
                
              })
              }else if(c=="foodItem"){
                con.query("SELECT * from menu NATURAL JOIN restaurants where itemname='"+req.body.searchFood+"'", function(err,result,fields){
                  if(err) throw err;

                  res.writeHead(200,{
                    'Content-Type' : 'application/json'
                 });
                 console.log(result);
                res.end(JSON.stringify(result));
                })
              }else if(c=="restaurant"){
                con.query("SELECT * from restaurants where name='"+req.body.searchFood+"'", function(err,result1,fields){
                  if(err) throw err;
                 
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                });
                console.log(result);
                res.end(JSON.stringify(result));
                
                })
          }
        })

        app.post('/getSection',function(req,res){
          console.log("Inside Section ");  
          var sectionList=[];
          console.log(req.body.email);
              con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
                if(err) throw err;
                
                console.log(result1[0].rid);
                con.query("SELECT * from sections where rid="+result1[0].rid, function(err,result,fields){
                  if(err) throw err;
                 
                  for(var i=0;i<result.length;i++){
                    sectionList[i]=result[i].name;
                  }
  
              res.writeHead(200,{
                  'Content-Type' : 'application/json'
              });
          console.log(sectionList);
          res.end(JSON.stringify(sectionList));
                })
          });
          })


    app.post('/cprofile',function(req,res){
      console.log("Inside Restaurant Profile");  
      console.log(req.body);
      var found=false;
          con.query("SELECT * from users where email='"+req.body.email+"'", function(err,result,fields){
            if(err) throw err;
           
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("User : ",JSON.stringify(result[0]));
    res.end(JSON.stringify(result[0]));
        });
  
      })


app.post('/rlogin',function(req,res){
  var found=false;
      con.query("SELECT email,password,name from restaurants", function(err,result,fields){
        if(err) throw err;
        var uname="";
        var msg="";
        console.log(result);
        console.log(req.body.username);
        console.log(req.body.password);
        //console.log(found);
        
        let cust_data = result;
        let flag = false;
        let passwordInDb="";
        cust_data.forEach(element => {
            if(req.body.username==element.email){
            flag=true;
            uname=element.name;
            passwordInDb=element.password;
            };
        });
          console.log(passwordInDb);
          bcrypt.compare(req.body.password, passwordInDb, function(err, resp) {
            if (resp) 
            {
            console.log("kdsl");
            res.cookie("cookie","restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie("user",uname,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie("email",req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.username;
            msg="Login Successful"  
           }else{
           //console.log("I ma here");
           msg="Invalid credentials"
            }
           res.end(msg)});
        })
    })
  

    app.post('/additem',function(req,res){
      var msg="";

      con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
        if(err) throw err;
        console.log(result1[0].rid);

         con.query("SELECT sid from sections where name='"+req.body.section+"'", function(err,result2,fields){
           if(err) throw err;

           var queryString1 = "INSERT INTO menu (itemname,description,price,image, sid,rid) VALUES (?,?,?,?,?,?)";    
           con.query(queryString1,[req.body.itemname,req.body.description,req.body.price,req.body.image,result2[0].sid,result1[0].rid],function(error, results){
               if (error){
                   console.log(error);
                   msg="Could Not Add Item! :(";
                   res.end(msg);
                }else {
                  console.log("Addededded");
                  msg="Item Added Successfully!" ;  
                  res.end(msg);            
                }
              })
           })
      });
    })

    app.post('/addsection',function(req,res){
      var msg="";
      con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
        if(err) throw err;
        console.log(result1[0].rid);

           var queryString1 = "INSERT INTO sections (name,rid) VALUES (?,?)";    
           con.query(queryString1,[req.body.sectionname,result1[0].rid],function(error, results){
               if (error){
                   console.log(error);
                   msg="Could Not Add Section! :(";
                   res.end(msg);
                }else {
                  console.log("Addededded");
                  msg="Section Added Successfully!" ;  
                  res.end(msg);            
                }
              })
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
                        var queryString1 = "INSERT INTO restaurants (name,email,password,oname,contact, address,city,zipcode,cuisine) VALUES (?,?,?,?,?,?,?,?,?)";    
                        con.query(queryString1,[req.body.restaurant,req.body.email,hash,req.body.fullname,req.body.contact,req.body.address,req.body.city,req.body.zipcode,req.body.cuisine],function(error, results){
                            if (error){
                                console.log(error);
                                msg="error";
                                res.end(msg);
                            }else {
                              res.cookie('cookie',"restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie("user",req.body.restaurant,{maxAge: 900000, httpOnly: false, path : '/'});                      
        res.cookie("email",req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
                              console.log("Howdyyy");
                              msg="Restaurant Added Successfully!" ;  
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
          //res.end(msg);
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
        res.end(msg);
                            }     
                            else      
                            {       
          console.log("I am blehh");
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

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");