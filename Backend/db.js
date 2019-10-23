var mysql=require('mysql');

const con = mysql.createPool({
    connectionLimit: 10,
    host: "database-1d.cba9kabwgk3a.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database:"grubhubapp"
  });

  module.exports=con;
  