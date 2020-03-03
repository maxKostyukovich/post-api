import chai from 'chai'
import chaiHttp from "chai-http";
import app from '../../'
import db from '../../models'


const User = db.User;
chai.use(chaiHttp);
let should = chai.should();

describe("User", () => {
    let token;
    let AccountId;
    before((done) => {
        const credentials = {
            email: "max.aq5@gmail.com",
            password: "qwerty123"
        };
        chai.request(app)
            .post('/api/login')
            .send(credentials)
            .end((err, res) => {
                res.body.should.have.property('accessToken');
                token = res.body.accessToken;
                AccountId = res.body.account.id;
            });
        done();
    });
    describe("/GET user ", () => {
        it("Should return all users", async () => {
            const users = await User.findAll();
            chai.request(app)
                .get('/api/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body.length.should.be.eql(users.length);
                });
        })
    });

    describe("/POST user", () => {
        it("Should return created user", (done) => {
            const user = {
                firstName: "Andrew",
                lastName: "Doe",
                age: 28,
                country: "Ukraine"
            };
            chai.request(app)
                .post('/api/user')
                .auth(token, {type: "bearer"})
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.firstName.should.eql(user.firstName);
                    res.body.AccountId.should.eql(AccountId);
                    done();
                });
        });

        it("Should return status 400 Bad request", (done) => {
            const user = {
                firstName: "max",
                age: 28,
                country: "Ukraine"
            };
            chai.request(app)
                .post('/api/user')
                .auth(token, {type: "bearer"})
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.eql('Last name is required');
                    done();
                })
        })
    });
    describe("All request with id", () => {
        let id;
        before(async () => {
            const user = await User.findOne({where: {AccountId}});
            id = user.id;
        });
        describe("/GET/:id user", () => {
            it("Should return user object", (done) => {
                chai.request(app)
                    .get('/api/user/' + id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.id.should.equal(id);
                        res.body.AccountId.should.equal(AccountId);
                        done();
                    })
            });
            it("Should return Not found err, status 404", (done => {
                chai.request(app)
                    .get('/api/user/212329')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.text.should.eql('User not found');
                        done()
                    })
            }))
        });
        describe("/PUT/:id user", () => {
            it("Should return status 200 and text ok", (done) => {
                const newUser = {
                    age: 18
                };
                chai.request(app)
                    .put('/api/user/' + id)
                    .auth(token, {type: "bearer"})
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.text.should.equal("ok");
                        done();
                    })
            });

            it("Should return validation error", (done => {
                const newUser = {
                    firstName: 123
                };
                chai.request(app)
                    .put('/api/user/' + id)
                    .auth(token, {type: "bearer"})
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.text.should.eql('firstName must be a `string` type, but the final value was: `123`.');
                        done();
                    })
            }));
            it("Should return not found error", (done) => {
                const newUser = {
                    age: 18
                };
                chai.request(app)
                    .put('/api/user/' + id + 126673)
                    .auth(token, {type: "bearer"})
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.text.should.equal("User not found");
                        done();
                    })
            })
        });
        describe("/DELETE/:id user", () => {
            it("Should return modified rows", (done) => {
                chai.request(app)
                    .delete('/api/user/' + id)
                    .auth(token, {type: "bearer"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.a('object');
                        res.body.should.have.property('modified');
                        res.body.modified.should.eql(1);
                        done();
                    })
            });

            it("Should return not found error", (done) => {
                chai.request(app)
                    .delete('/api/user/123123')
                    .auth(token, {type: "bearer"})
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.text.should.equal("User not found");
                        done();
                    })
            })
        })
    });
});