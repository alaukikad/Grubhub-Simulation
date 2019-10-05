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