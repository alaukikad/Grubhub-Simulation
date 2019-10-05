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
var path = require('path');
const multer = require('multer');


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

app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: './public/images/all/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + 'IMAGE-' + Date.now() + path.extname(file.originalname)
    )
  }
})

const upload = multer({
  storage: storage
}).single('myImage')

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

  app.post('/cprofileuploadimage', function (req, res) {
    upload(req, res, err => {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end('Could not upload!!')
      } else {
       
        console.log(req.body)
        console.log(req.file)
  
       let  uid = req.body.uid;
       let  filename = req.file.filename;
  
        console.log("Filename : " + req.file.filename)

        sql = "UPDATE users SET image=? where uid=?";
       
        con.query(sql,[filename,uid], (err, result) => {
          if (err) {
            console.log("Error occured : " + err);
          } else {
            console.log("Image updated in database")
          }
        });
  
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(req.file))
      }
    })
  })

  app.post('/rprofileuploadimage', function (req, res) {
    upload(req, res, err => {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end('Could not upload!!')
      } else {
       
        console.log(req.body)
        console.log(req.file)
  
       let  rid = req.body.rid;
       let  filename = req.file.filename;
  
        console.log("Filename : " + req.file.filename)

        sql = "UPDATE restaurants SET oimage=? where rid=?";
       
        con.query(sql,[filename,rid], (err, result) => {
          if (err) {
            console.log("Error occured : " + err);
          } else {
            console.log("Image updated in database")
          }
        });
  
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(req.file))
      }
    })
  })

  app.post('/restaurantuploadimage', function (req, res) {
    upload(req, res, err => {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end('Could not upload!!')
      } else {
        
        console.log(req.body)
        console.log(req.file)
  console.log("Alaukika is watching")
       let  rid = req.body.rid;
       let  filename = req.file.filename;
  
        console.log("Filename : " + req.file.filename)

        sql = "UPDATE restaurants SET rimage=? where rid=?";
       
        con.query(sql,[filename,rid], (err, result) => {
          if (err) {
            console.log("Error occured : " + err);
          } else {
            console.log("Image updated in database")
          }
        });
  
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(req.file))
      }
    })
  })
 
  app.post('/itemuploadimage', function (req, res) {
    console.log("gashdghahgdshdghhsdghgshdghsdgdhdhdsgghdhds")
    upload(req, res, err => {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end('Could not upload!!')
      } else {
        console.log('Inside upload post call')
        console.log(req.body)
        console.log(req.file)
  
       let  mid = req.body.mid;
       let  filename = req.file.filename;
  
        console.log("Filename : " + req.file.filename)

        sql = "UPDATE menu SET image=? where mid=?";
       
        con.query(sql,[filename,mid], (err, result) => {
          if (err) {
            console.log("Error occured : " + err);
          } else {
            console.log("Image updated in database")
          }
        });
  
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(req.file))
      }
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
  
app.post('/edititem',function(req,res){
    console.log("Inside Edit Item ");  
    console.log(req.body);   

          var sql = "UPDATE menu SET itemname=?,image=?,description=?,price=?,sid=? WHERE mid="+req.body.id;
          con.query(sql,[req.body.itemname,req.body.image,req.body.description,req.body.price,req.body.sid] ,function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            res.end("Details Updated!");
          });
       
    })

app.post('/editsection',function(req,res){
      console.log("Inside Edit Section ");  
      console.log(req.body);   

            var sql = "UPDATE sections SET name=? WHERE sid="+req.body.id;
            con.query(sql,[req.body.name],function (err, result) {
              if (err) throw err;

              console.log(result.affectedRows + " record(s) updated");
              res.end("Section Updated!");
            });
         
      }) 

app.post('/getitem',function(req,res){
      console.log("Inside Get Item ");  
      console.log(req.body);   
  
      con.query("SELECT * from menu NATURAL JOIN sections where mid="+req.body.id, function(err,result,fields){
        if(err) throw err;
              res.end(JSON.stringify(result[0]));
            });
    })
      
app.post('/confirmOrder',function(req,res){
    console.log("Inside Confirm Order");  
    console.log(req.body);   
    con.query("SELECT uid from users where email='"+req.body.email+"'", function(err,result1,fields){
      if(err) throw err;
    con.query("INSERT INTO orders (uid,rid,status,price,timestamp) VALUES ("+result1[0].uid+","+req.body.rid+",2,"+req.body.total+",now())", function(err,result2,fields){
      if(err) throw err;
      con.query("SELECT * from orders where uid="+result1[0].uid+" AND rid="+req.body.rid+" AND status=2 AND price="+req.body.total, function(err,result3,fields){
        if(err) throw err;
    
          con.query("UPDATE orderdetails SET status=2,oid="+result3[0].oid+" WHERE uid="+result1[0].uid+" AND status=1" ,function (err, result) {
            if (err) throw err; 
            console.log(result.affectedRows + " record(s) updated");
            res.end("Details Updated!");
          })
          });
    })
  })
  })

app.post('/cancelOrder',function(req,res){
    console.log("Inside Confirm Order");  
    console.log(req.body);   
    con.query("SELECT uid from users where email='"+req.body.email+"'", function(err,result1,fields){
      if(err) throw err;
          con.query("DELETE from orderdetails WHERE uid="+result1[0].uid+" AND status=1" ,function (err, result) {
            if (err) throw err; 
            
            res.end("Cart Cleared!");
          })
        })
  })

app.post('/upcomingOrder',function(req,res){
    console.log("Inside Upcoming Order");  
    console.log(req.body);   
    con.query("SELECT uid from users where email='"+req.body.email+"'", function(err,result1,fields){
      if(err) throw err;
      con.query("SELECT o.oid,r.name,m.itemname,od.price,od.qty,s.status from orders o,orderdetails od,restaurants r,menu m,status s where s.statid=o.status && o.uid="+result1[0].uid+" && m.mid=od.mid && o.status in (2,3,4) && od.oid=o.oid && o.rid=r.rid ", function(err,result,fields){
        if(err) throw err;

        res.end(JSON.stringify(result));
      })
    })
  })

app.post('/pastOrder',function(req,res){
    console.log("Inside Past Order");  
    console.log(req.body);   
    con.query("SELECT uid from users where email='"+req.body.email+"'", function(err,result1,fields){
      if(err) throw err;
      con.query("SELECT o.oid,r.name,m.itemname,od.price,od.qty,s.status from orders o,orderdetails od,restaurants r,menu m,status s where s.statid=o.status && o.uid="+result1[0].uid+" && m.mid=od.mid && o.status in (5,6) && od.oid=o.oid && o.rid=r.rid ", function(err,result,fields){
        if(err) throw err;

        res.end(JSON.stringify(result));
      })
    })
  })

app.post('/cancelledOrder',function(req,res){
    console.log("Inside Delivered Order");  
    console.log(req.body);   
    con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
      if(err) throw err;
      con.query("SELECT u.name,u.address,u.uid,o.oid,m.itemname,od.price,od.qty,s.status from users u,orders o,orderdetails od,restaurants r,menu m,status s where s.statid=o.status && u.uid=o.uid && r.rid="+result1[0].rid+" && m.mid=od.mid && o.status=5 && od.oid=o.oid && o.rid=r.rid ", function(err,result,fields){
        if(err) throw err;

        res.end(JSON.stringify(result));
      })
    })
  })

app.post('/pendingOrder',function(req,res){
    console.log("Inside Delivered Order");  
    console.log(req.body);   
    con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
      if(err) throw err;
      con.query("SELECT u.name,u.address,u.uid,o.oid,m.itemname,od.price,od.qty,s.status from users u,orders o,orderdetails od,restaurants r,menu m,status s where s.statid=o.status && u.uid=o.uid && r.rid="+result1[0].rid+" && m.mid=od.mid && o.status in (2,3,4) && od.oid=o.oid && o.rid=r.rid ", function(err,result,fields){
        if(err) throw err;

        res.end(JSON.stringify(result));
      })
    })
  })

app.post('/deliveredOrder',function(req,res){
    console.log("Inside Delivered Order");  
    console.log(req.body);   
    con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
      if(err) throw err;
      con.query("SELECT u.name,u.address,u.uid,o.oid,m.itemname,od.price,od.qty,s.status from users u,orders o,orderdetails od,restaurants r,menu m,status s where s.statid=o.status && u.uid=o.uid && r.rid="+result1[0].rid+" && m.mid=od.mid && o.status=6 && od.oid=o.oid && o.rid=r.rid ", function(err,result,fields){
        if(err) throw err;

        res.end(JSON.stringify(result));
      })
    })
  })

app.post('/updateOrderStatus',function(req,res){
    console.log("Inside Update Order Status");  
    console.log(req.body);   
    con.query("SELECT statid from status where status='"+req.body.status+"'", function(err,result1,fields){
      if(err) throw err;
      con.query("UPDATE orders SET status="+result1[0].statid+" WHERE oid="+req.body.oid, function(err,result,fields){
        if(err) throw err;

        con.query("UPDATE orderdetails SET status="+result1[0].statid+" WHERE oid="+req.body.oid, function(err,result,fields){
          if(err) throw err;
        
        
          res.end("Details Updated!");

        })
      })
    })
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

app.post('/checkOut',function(req,res){
        console.log("Inside CheckOut Item ");  
        console.log(req.body);
        let p=[];
        let q=req.body.qty;
        var sql=""
        con.query("SELECT uid from users where email='"+req.body.uid+"'", function(err,result1,fields){
          if(err) throw err;

          con.query("SELECT * from orderdetails where uid="+result1[0].uid+" AND status=1", function(err,result3,fields){
            if(err) throw err;
            console.log(result3);
            if(result3[0]!=null){  
              console.log("blehhh");
              res.end("You already have Items in your Cart!");
            }else{
          for(var i=0;i<q.length;i++){
            console.log(i)
            console.log(q[i]);
            if(q[i]!=null){
              console.log(q[i]);
              console.log(i);
              sql="SELECT mid,price from menu where mid=?"
             
              con.query(sql,[i], function(err,result2,fields){
                if(err) throw err;
                
                console.log(result2[0].mid);
                console.log(result2[0].price);
                i=result2[0].mid
               con.query("INSERT INTO orderdetails (mid,qty,status,price,uid) VALUES ("+i+","+q[i]+",1,"+q[i]*result2[0].price+","+result1[0].uid+")", function(err,result,fields){
              if(err) throw err;
            
            })
          })
            }
          }
            res.writeHead(200,{
              'Content-Type' : 'application/json'
            });
            res.end("Proceeding!");
          
        }
          
        })
      })
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
              con.query("SELECT * from menu m, sections s where m.sid=s.sid && m.rid="+result1[0].rid, function(err,result,fields){
                if(err) throw err;

            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
        console.log(result);
        res.end(JSON.stringify(result));
              })
        });
        })

app.post('/getCart',function(req,res){
          console.log("Inside Cart");  
          console.log(req.body);
          var found=false;
              con.query("SELECT uid from users where email='"+req.body.email+"'", function(err,result1,fields){
                if(err) throw err;
               
                con.query("SELECT did,oid,o.mid,qty,status,itemname,o.price,m.rid,name from orderdetails o,menu m,restaurants r where uid="+result1[0].uid+" AND status=1 AND o.mid=m.mid AND r.rid=m.rid", function(err,result,fields){
                  if(err) throw err;

        res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
            console.log("Menu : ",JSON.stringify(result));
            res.end(JSON.stringify(result));
            });
          })
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

app.post('/getSectionFromID',function(req,res){
            console.log("Inside Section ID ");  
           
            console.log(req.body.id);
              
                  con.query("SELECT name from sections where sid="+req.body.id, function(err,result,fields){
                    if(err) throw err;
                     
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                });
            
            res.end(result[0].name);
                  })    
})

app.post('/additem',function(req,res){
      var msg="";

      con.query("SELECT rid from restaurants where email='"+req.body.email+"'", function(err,result1,fields){
        if(err) throw err;
        console.log(result1[0].rid);

           var queryString1 = "INSERT INTO menu (itemname,description,price,sid,rid) VALUES (?,?,?,?,?)";    
           con.query(queryString1,[req.body.itemname,req.body.description,req.body.price,req.body.sid,result1[0].rid],function(error, results){
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

app.post('/deleteSection',function(req,res){
      console.log("Inside Delete Selection ");  
      console.log(req.body);
      var msg="";
          con.query("DELETE from menu where sid="+req.body.id, function(err,result,fields){
            if(err) throw err;

            con.query("DELETE from sections where sid="+req.body.id, function(err,result,fields){
              if(err) throw err;
           
          res.writeHead(200,{
            'Content-Type' : 'application/json'
          });

          res.end("Section Deleted");
        });
        });
      })

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");