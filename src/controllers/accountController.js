import db from '../models';
import { sequelize } from '../models';
import bcrypt from 'bcryptjs';
import Unauthorized from '../errorHandlers/UnauthorizedError';
import { generateAccessToken } from '../utils/generateToken';
const Account = db.Account;
module.exports.create = async (req, res, next) => {
    try {
        const account = await Account.create(req.body);
        const accessToken = generateAccessToken(account.id);
        account.password = undefined;
        res.send({account, accessToken});
    } catch (e) {
        next(e);
    }
};

module.exports.get = async (req, res, next) => {
  const account = await Account.findByPk(req.params.id);
  res.send(account);
};

module.exports.login = async (req, res, next) => {
    try {
        const hashPassword = req.body.password;
        const account = await Account.findOne({where: {email: req.body.email}});
        if (!account) {
            return next(new Unauthorized('Invalid credentials'))
        }
        const isValid = bcrypt.compareSync(hashPassword, account.password);
        if (!isValid) {
            return next(new Unauthorized('Invalid credentials'))
        }
        const accessToken = generateAccessToken(account.id);
        account.password = undefined;
        res.send({account, accessToken});
    } catch (e) {
        next(e);
    }
};
