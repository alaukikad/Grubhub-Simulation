var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/login')
    .send({ "username": "user15@user.com", "password" : "user15"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.have.cookie('cookie');
        done();
    });
})

it("Should check credentials and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/rlogin')
    .send({ "username": "alau@alau.com", "password" : "nachi"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.have.cookie('cookie');
        done();
    });
})

it("Should check credentials and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/cregister')
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

it("Should check credentials and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/rregister')
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

it("Should check credentials and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/addsection')
    .send({ 
    "email" : "alau@alau.com",
    "sectionname" : "Breakfast"
})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})