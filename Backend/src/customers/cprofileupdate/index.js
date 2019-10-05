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