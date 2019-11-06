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
let con=require('./db')
var Database = require('./database');
var Users=require('./models/Users');
var Restaurants=require('./models/Restaurants');
var Menu=require('./models/Menu');
var config = require('./config/settings');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka=require('./kafka/client');
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://3.93.146.80:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.json());
app.use(express.static('public'))


app.use(passport.initialize());
// Bring in defined Passport Strategy
require('./config/passport')(passport);

var loginRouter = require('./src/customers/login/index');
var rloginRouter = require('./src/restaurants/rlogin/index');
var deleteSectionRouter = require('./src/restaurants/deleteSection/index');
var cancelOrderRouter = require('./src/customers/cancelOrder/index');
var checkOutRouter=require('./src/customers/checkOut/index')
var confirmOrderRouter=require('./src/customers/confirmOrder/index')
var cprofileRouter=require('./src/customers/cprofile/index')
var cprofileupdateRouter=require('./src/customers/cprofileupdate/index')
var cregisterRouter=require('./src/customers/cregister/index')
var getCartRouter=require('./src/customers/getCart/index')
var pastOrderRouter=require('./src/customers/pastOrder/index')
var searchFoodRouter=require('./src/customers/searchFood/index')
var upcomingOrderRouter=require('./src/customers/upcomingOrder/index')
var getCuisineRouter=require('./src/getCuisine/index')
var getitemRouter=require('./src/getitem/index')
var getMenuRouter=require('./src/getMenu/index')
var getSectionRouter=require('./src/getSection/index')
var getSectionFromIDRouter=require('./src/getSectionFromID/index')
var additemRouter=require("./src/restaurants/additem/index") 
var addsectionRouter=require("./src/restaurants/addsection/index") 
var cancelledOrderRouter=require("./src/restaurants/cancelledOrder/index") 
var deleteitemRouter=require("./src/restaurants/deleteitem") 
var deliveredOrderRouter=require("./src/restaurants/deliveredOrder/index") 
var edititemRouter=require("./src/restaurants/edititem/index") 
var editsectionRouter=require("./src/restaurants/editsection/index") 
var pendingOrderRouter=require("./src/restaurants/pendingOrder/index") 
var rprofileRouter=require("./src/restaurants/rprofile/index") 
var rprofileupdateRouter=require("./src/restaurants/rprofileupdate/index") 
var rregisterRouter=require("./src/restaurants/rregister/index") 
var updateOrderStatusRouter=require("./src/restaurants/updateOrderStatus/index") 
var sendMessageRouter=require('./src/sendMessage')
var getMessageRouter=require('./src/getMessage')
var getSentMessageRouter=require('./src/getSentMessage')

app.use('/login',loginRouter);
app.use('/rlogin',rloginRouter);
app.use('/deleteSection',deleteSectionRouter)
app.use('/cancelOrder',cancelOrderRouter)
app.use('/checkOut',checkOutRouter)
app.use('/confirmOrder',confirmOrderRouter)
app.use('/cprofile',cprofileRouter)
app.use('/cprofileupdate',cprofileupdateRouter)
app.use('/cregister',cregisterRouter)
app.use('/getCart',getCartRouter)
app.use('/pastOrder',pastOrderRouter)
app.use( '/searchFood',searchFoodRouter)
app.use( '/upcomingOrder',upcomingOrderRouter)
app.use( '/getCuisine',getCuisineRouter)
app.use( '/getitem',getitemRouter)
app.use( '/getMenu',getMenuRouter)
app.use( '/getSection',getSectionRouter)
app.use( '/getSectionFromID',getSectionFromIDRouter)
app.use( '/additem',additemRouter)
app.use( '/addsection',addsectionRouter)
app.use( '/cancelledOrder',cancelledOrderRouter)
app.use( '/deleteitem',deleteitemRouter)
app.use( '/deliveredOrder',deliveredOrderRouter)
app.use( '/edititem',edititemRouter)
app.use( '/editsection',editsectionRouter)
app.use( '/pendingOrder',pendingOrderRouter)
app.use( '/rprofile',requireAuth,rprofileRouter)
app.use( '/rprofileupdate',rprofileupdateRouter)
app.use( '/rregister',rregisterRouter)
app.use( '/updateOrderStatus',updateOrderStatusRouter) 
app.use( '/sendMessage',sendMessageRouter)
app.use( '/getMessage',getMessageRouter)
app.use( '/getSentMessage',getSentMessageRouter)


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

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://3.93.146.80:3000');
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
        console.log("Filename : " + req.file.filename)
       
        Users.findOneAndUpdate({email : req.body.uid},{image :req.file.filename}, function(err, result) {
          if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                res.end("Details Updated!");
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
        console.log("Filename : " + req.file.filename)

        Restaurants.findOneAndUpdate({email : req.body.rid},{oimage :req.file.filename}, function(err, result) {
          if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                res.end("Details Updated!");
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
    
        Restaurants.findOneAndUpdate({email : req.body.rid},{rimage :req.file.filename}, function(err, result) {
          if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                res.end("Details Updated!");
              });

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(req.file))
      }
    })
  })
 
  app.post('/itemuploadimage', function (req, res) {
    console.log("Image Update")
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
  
        Menu.findOneAndUpdate({_id : req.body.mid},{image :req.file.filename}, function(err, result) {
          if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
                res.end("Details Updated!");
              });

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        res.end(JSON.stringify(req.file))
      }
    })
  })

  // app.post('/cprofileuploadimage', function (req, res) {
  //   upload(req, res, err => {
  //     if (err) {
  //       res.writeHead(400, {
  //         'Content-Type': 'text/plain'
  //       })
  //       res.end('Could not upload!!')
  //     } else {
       
  //       console.log(req.body)
  //       console.log(req.file)
  
  //      let  uid = req.body.uid;
  //      let  filename = req.file.filename;
  
  //       console.log("Filename : " + req.file.filename)

  //       sql = "UPDATE users SET image=? where uid=?";
       
  //       con.query(sql,[filename,uid], (err, result) => {
  //         if (err) {
  //           console.log("Error occured : " + err);
  //         } else {
  //           console.log("Image updated in database")
  //         }
  //       });
  
  //       res.writeHead(200, {
  //         'Content-Type': 'text/plain'
  //       })
  //       res.end(JSON.stringify(req.file))
  //     }
  //   })
  // })

  // app.post('/rprofileuploadimage', function (req, res) {
  //   upload(req, res, err => {
  //     if (err) {
  //       res.writeHead(400, {
  //         'Content-Type': 'text/plain'
  //       })
  //       res.end('Could not upload!!')
  //     } else {
       
  //       console.log(req.body)
  //       console.log(req.file)
  
  //      let  rid = req.body.rid;
  //      let  filename = req.file.filename;
  
  //       console.log("Filename : " + req.file.filename)

  //       sql = "UPDATE restaurants SET oimage=? where rid=?";
       
  //       con.query(sql,[filename,rid], (err, result) => {
  //         if (err) {
  //           console.log("Error occured : " + err);
  //         } else {
  //           console.log("Image updated in database")
  //         }
  //       });
  
  //       res.writeHead(200, {
  //         'Content-Type': 'text/plain'
  //       })
  //       res.end(JSON.stringify(req.file))
  //     }
  //   })
  // })

  // app.post('/restaurantuploadimage', function (req, res) {
  //   upload(req, res, err => {
  //     if (err) {
  //       res.writeHead(400, {
  //         'Content-Type': 'text/plain'
  //       })
  //       res.end('Could not upload!!')
  //     } else {
        
  //       console.log(req.body)
  //       console.log(req.file)
  // console.log("Alaukika is watching")
  //      let  rid = req.body.rid;
  //      let  filename = req.file.filename;
  
  //       console.log("Filename : " + req.file.filename)

  //       sql = "UPDATE restaurants SET rimage=? where rid=?";
       
  //       con.query(sql,[filename,rid], (err, result) => {
  //         if (err) {
  //           console.log("Error occured : " + err);
  //         } else {
  //           console.log("Image updated in database")
  //         }
  //       });
  
  //       res.writeHead(200, {
  //         'Content-Type': 'text/plain'
  //       })
  //       res.end(JSON.stringify(req.file))
  //     }
  //   })
  // })
 
  // app.post('/itemuploadimage', function (req, res) {
  //   console.log("gashdghahgdshdghhsdghgshdghsdgdhdhdsgghdhds")
  //   upload(req, res, err => {
  //     if (err) {
  //       res.writeHead(400, {
  //         'Content-Type': 'text/plain'
  //       })
  //       res.end('Could not upload!!')
  //     } else {
  //       console.log('Inside upload post call')
  //       console.log(req.body)
  //       console.log(req.file)
  
  //      let  mid = req.body.mid;
  //      let  filename = req.file.filename;
  
  //       console.log("Filename : " + req.file.filename)

  //       sql = "UPDATE menu SET image=? where mid=?";
       
  //       con.query(sql,[filename,mid], (err, result) => {
  //         if (err) {
  //           console.log("Error occured : " + err);
  //         } else {
  //           console.log("Image updated in database")
  //         }
  //       });
  
  //       res.writeHead(200, {
  //         'Content-Type': 'text/plain'
  //       })
  //       res.end(JSON.stringify(req.file))
  //     }
  //   })
  // })

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");