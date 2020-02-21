import db from '../models'
import UnauthorizedError from '../errorHandlers/UnauthorizedError'
const Account = db.Account;
module.exports = async (req, res, next) => {
    const account = await Account.findByPk(req.payload.id);
    if(!account.isPaid){
        return next(new UnauthorizedError('Account has not been paid'));
    }
    next();
};