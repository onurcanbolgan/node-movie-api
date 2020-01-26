const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token,directorId;


describe('api/directors test', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username:'onur', password:'123456'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    describe('/GET directors', () => {
        it('it should GET all the directors', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token',token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/POST director', () => {
        it('it should POST a director', (done) => {
            const director = {
                name: 'Elliot',
                surname: 'Robot',
                bio: 'Softwroader'
            };
            chai.request(server)
                .post('/api/directors')
                .send(director)
                .set('x-access-token',token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    directorId = res.body._id;
                    done();
                });
        }) ;
    });
    describe('/GET/:director_id director', () => {
        it('it should GET a director by the given id', (done) => {
            chai.request(server)
                .get('/api/directors/'+directorId)
                .set('x-access-token',token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    res.body.should.have.property('movies');
                    res.body.should.have.property('_id').eql(directorId);
                    done();
                });
        });
    });
    describe('/PUT/:director_id director', () => {
        it('it should update a director given by id', (done) => {
            const director = {
                name: 'tr',
                surname: '43roelsa',
                bio: 'Sfsfe'
            };
            chai.request(server)
                .put('/api/directors/' + directorId)
                .send(director)
                .set('x-access-token',token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                });
        }) ;
    });
    describe('/DELETE/:director_id director', () => {
        it('it should delete a director given by id', (done) => {
            chai.request(server)
                .delete('/api/directors/' + directorId)
                .set('x-access-token',token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                        res.body.should.have.property('status').eql(1)
                    res.body.should.have.property('deleted').eql(true);
                    done();
                });
        }) ;
    });
})