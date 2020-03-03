import db from '../models';
import NotFoundError from '../errorHandlers/NotFoundError';
import DBError from '../errorHandlers/DBError';
import { sequelize } from '../models';
const User = db.User;
const Account = db.Account;

module.exports.create = async (req, res, next) => {
  let transaction;
  try{
    transaction = await sequelize.transaction();
    const account = await Account.findByPk(req.payload.id);
    if(!account){
      return next( new NotFoundError('Account not found'))
    }
    await User.destroy({where: { AccountId: account.id }}, transaction);
    req.body.AccountId = account.id;
    const user = await User.create(req.body, { transaction });
    await transaction.commit();
    res.send(user);
  }catch (e) {
    if(e){
      await transaction.rollback();
      next(e);
    }
  }
};

module.exports.get = async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {attributes:{exclude: ["createdAt", "updatedAt"]}});
  if(!user){
    return next(new NotFoundError('User not found'))
  }
  res.send(user);
};

module.exports.getAll = async (req, res, next) => {
  const users = await User.findAll({attributes: {exclude: ["createdAt", "updatedAt"]}});
  if(!users){
    return next(new NotFoundError('User not found'))
  }
  res.send(users);
};

module.exports.update = async (req, res, next) => {
  try {
    req.body.id = undefined;
    const result = await User.update(req.body, {where: {id: req.params.id}});
    if(result[0] < 1){
      return next(new NotFoundError('User not found'));
    }
    res.status(200).send('ok');
  } catch (err) {
    next(err)
  }
};

module.exports.delete = async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id);
    if(!user){
      return next(new NotFoundError('User not found'));
    }
    const numOfModified = await User.destroy({where: {id: req.params.id}});
    res.send({modified: numOfModified});
  } catch (err) {
    next(err);
  }
};