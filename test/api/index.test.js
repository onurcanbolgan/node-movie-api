const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

describe('Node Server', () => {
   it('(GET /) returns homepage', (done) => {
       chai.request(server)
       .get('/')
           .end((err, res) => {
              res.should.have.status(200);
              done();
           });
   });
});

describe('Register', () => {
   it('(POST /register) returns register', (done) => {
       const user = {
           username: 'firstcheck',
           password: 'havehave'
       }
       chai.request(server)
       .post('/register')
           .send(user)
           .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('username');
              res.body.should.have.property('password');
              done();
           });
   });
});