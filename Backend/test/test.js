var chai = require('chai'), chaiHttp = require('chai-http');
const hostname="localhost";
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsYXVAYWxhdS5jb20iLCJ1c2VyIjoicmVzdGF1cmFudCIsImlhdCI6MTU3MjkyODc4NCwiZXhwIjoxNTczMDE1MTg0fQ.lo6e4UAbFaVk0zXsTc6wIRjklhwSSWQpDPvFHUCss10"

chai.use(chaiHttp);

var expect = chai.expect;

it("Customer Login - Should check credentials and return status code", function(done){
    chai.request('http://'+hostname+':3001')
    .post('/login/login')
    .send({ "username": "user15@user.com", "password" : "user15"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
      //  expect(res).to.have.cookie('cookie');
        done();
    });
})

it("Customer Registraion - Should check input Registration details for Customer and return status code", function(done){
    chai.request('http://'+hostname+':3001')
    .post('/cregister/cregister')
    .send({ 
    "email" : "sarah@jones.com",
    "password" : "sarah",
    "fullname": "Sarah Jones",
    "contact": "87727832",
    "address" : "101 Sarah Hill San Jose"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
       
        done();
    });
})

it("Restaurant Registration - Should check input Registration details for Restaurant and return status code", function(done){
    chai.request('http://'+hostname+':3001')
    .post('/rregister/rregister')
    .send({
        "email" : "maggie@maggie.com",
            "password" : "maggie",
            "fullname": "Maggie Jone",
            "contact": "7287822",
            "address" : "123 S 3rd Street San Jose",
            "city" : "San Jose",
            "zipcode" : "95113",
            "restaurant" : "My Kitchen",
            "cuisine" : "Greek"})
        .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

it("Add Section - Should add Section to DB andreturn status code", function(done){
    chai.request('http://'+hostname+':3001')
   //
    .post('/addsection/addsection')
    .set("Authorization", "Bearer " + token)
    .send({ 
    "email" : "alau@alau.com",
    "sectionname" : "Breakfast"
})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


it("Pending Order - Should check Restaurant ID and return status code", function(done){   
    chai.request('http://'+hostname+':3001')
    
    .post('/pendingOrder/pendingOrder')
   // .set("Authorization", "Bearer " + token)
    .send({ 
    "email" : "alau@alau.com",
})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

