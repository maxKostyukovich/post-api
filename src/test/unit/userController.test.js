import sinon from "sinon";
import UserController from '../../controllers/userController'
import db from '../../models'
import NotFoundError from "../../errorHandlers/NotFoundError";
const User = db.User;
const Account = db.Account;
describe('User Controller', () => {
    let req = {
        body: {
            firstName: "max",
            lastName: "kost",
            age: 21,
            country: "Ukraine"
        },
        payload: {
            id: 1,
        }
    };
    let error = new Error ("Error");
    let res = {};
    let nextFunction;
    let expectedResult;

    describe('Create', () => {
        beforeEach(() => {
            res = {
                send: sinon.spy()
            };
            nextFunction = sinon.spy();
        });
        it("Should return created object", async () => {
            expectedResult = req.body;
            sinon.stub(User, 'create').returns(expectedResult);
            sinon.stub(User, 'destroy');
            await UserController.create(req, res, nextFunction);
            sinon.assert.calledWith(User.create, req.body);
            sinon.assert.calledWith(res.send, sinon.match({AccountId: req.payload.id}));
            sinon.assert.calledWith(res.send, sinon.match({country: req.body.country}));
        });

        it("Should call next function with error", async () => {
           req.payload.id = 23413;
           error = new NotFoundError('Account not found');
           await UserController.create(req, res, nextFunction);
           sinon.assert.calledOnce(nextFunction);
           sinon.assert.calledWith(nextFunction, sinon.match({ message: error.message }));
        });


    })
});