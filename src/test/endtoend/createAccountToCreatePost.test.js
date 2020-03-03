import chai from 'chai'
import chaiHttp from "chai-http";
import app from '../../'
import db from '../../models'
import fs from 'fs'

const Account = db.Account;
chai.use(chaiHttp);
let should = chai.should();
describe("End to end testing, Account, User, Credit_card, Post ", () => {
    const newAccount = {
        email: "test@test.com",
        password: "qwerty123"
    };
    const newCreditCard = {
        card_number: "23324241234",
        cvv_card: "323",
        expiration_date: "09/20"
    };
    const newUser = {
      firstName: "max",
      lastName: "kost",
      age: 21,
      country: "Ukraine"
    };
    let account;
    before(async () => {
        account = await Account.findOne({where: {email: newAccount.email}});
        if(account){
            throw new Error("Account email is not unique")
        }
    });
    it("Step by step testing, from create account to create post", async () => {
        account = await chai.request(app)
            .post('/api/account')
            .send(newAccount);
        if(!account.body.accessToken){
            throw new Error("Account was not created")
        }
        let res = await chai.request(app)
            .post('/api/credit-card')
            .auth(account.body.accessToken, {type: "bearer"})
            .send(newCreditCard);
        res.should.have.status(200);
        res.body.should.have.property('AccountId');
        res.body.card_number.should.eql(newCreditCard.card_number);
        res = await chai.request(app)
            .post('/api/user')
            .auth(account.body.accessToken, {type: "bearer"})
            .send(newUser);
        res.should.have.status(200);
        res.body.should.have.property('firstName');
        res = await chai.request(app)
            .post('/api/post')
            .auth(account.body.accessToken, {type: "bearer"})
            .type('form')
            .field({
                'title':'New post',
                'description':'New description',
                'date':'2020-03-20 12:00',
                'topic': 'sport'
            })
            .attach('mainImg', fs.readFileSync(process.cwd() + '/public/static/images/postImages/0.png'), '0.png');
        res.should.have.status(200);
        res.body.should.have.property('mainImg');
        res.body.AccountId.should.eql(account.body.account.id);
        await Account.destroy({where: {id: account.body.account.id}})
    })
});