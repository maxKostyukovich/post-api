const proxyquire = require('proxyquire');
import isPaid from '../../middlewares/isPaidCheckMiddleware'
import {expect} from 'chai'
import db from '../../models'

const Account = db.Account;
describe('Is Paid Middleware', () => {
    it('Check is paid middleware positive case', async () => {
        const account = await Account.findOne({ where: {
                isPaid: true
            } });
        const req = {
            payload: {
                id: account.id
            }
        };
        await isPaid(req, {}, (err) => {
            expect(err).not.exist
        });
    });
    it('Check is paid middleware negative case', async () => {
        const account = await Account.findOne({ where: {
                isPaid: false
            } });
        const req = {
            payload: {
                id: account.id
            }
        };
        await isPaid(req, {}, (err) => {
            expect(err).exist
        });
    });
});

