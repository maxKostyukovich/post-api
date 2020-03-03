import tokenVerifyMiddleware from '../../middlewares/tokenVerifyMiddleware'
import {generateAccessToken} from "../../utils/generateToken";
import {JWT} from '../../constants'
import {expect} from 'chai'
import sinon from 'sinon'
import jwt from 'jsonwebtoken'
describe("Verify token middleware", () => {
    let req = {
        headers: {authorization: "Bearer "}
    };
    //const sleep = m => new Promise(r => setTimeout(r, m));
    it("Should call next function without error", async () => {
        const token = generateAccessToken(1);
        req.headers.authorization += token;
        const next = sinon.spy();
        tokenVerifyMiddleware(req, {}, next);
        sinon.assert.calledOnce(next);
        expect(next.getCall(0).args.length).equals(0);
        expect(req.payload).exist;
    });

    it("Should call next function with token expired error", async () => {
        const payload = {
            type: JWT.access.type,
            id: 1
        };
        const token = jwt.sign(payload, JWT.secretKey, { expiresIn: "1ms" });
        req.headers.authorization += token;
        const next = sinon.spy();
        tokenVerifyMiddleware(req, {}, next);
        sinon.assert.calledOnce(next);
        sinon.assert.calledWith(next, sinon.match({status: 401}));
    })
});