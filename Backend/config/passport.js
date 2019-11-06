'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
//var db = require('../app/db');
var Users=require('../models/Users');
var Restaurants=require('../models/Restaurants');
var config = require('./settings');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    console.log("Hiii")
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log(jwt_payload);
        if(jwt_payload.user=="restaurant"){
            // Restaurants.find({email: jwt_payload.email}, function(err,result,fields){
            //     // db.findUser({username: jwt_payload.username}, function (res) {
            //         if(err || result == null) {
            //             console.log(err);
            //             console.log("UnAuthorized User")
            //             callback("Not valid token", false)
            //         } else {
                        console.log("user is authorized")
                        callback(null, jwt_payload);
              //      }
                    
           // });
        }else{
            // Users.find({email: jwt_payload.email}, function(err,result,fields){
            //     // db.findUser({username: jwt_payload.username}, function (res) {
            //         if(err || result == null) {
            //             console.log(err);
            //             console.log("UnAuthorized User")
            //             callback("Not valid token", false)
            //         } else {
                        console.log("user is authorized")
                        callback(null, jwt_payload);
                   // }
                    
           // });
        }
        
}))
};
