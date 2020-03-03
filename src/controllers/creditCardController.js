import db from '../models';
import { sequelize } from '../models';
import NotFoundError from '../errorHandlers/NotFoundError'
const Account = db.Account;
const CreditCard = db.Credit_card;
module.exports.create = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const account = await Account.findByPk(req.payload.id);
        req.body.AccountId = account.id;
        const card = await CreditCard.create(req.body, {transaction});
        await account.update({isPaid: true}, { transaction });
        await transaction.commit();
        res.send(card);
    } catch (e) {
        await transaction.rollback();
        next(e);
    }
};

module.exports.delete = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const account = await Account.findByPk(req.payload.id);
        const card = await CreditCard.findByPk(req.params.id);
        if(!card){
            return next(new NotFoundError('Credit card was not found'));
        }
        await card.setAccount(null);
        const modified = await CreditCard.destroy({where: {id: req.params.id}}, transaction);
        await account.update({isPaid: false}, transaction);
        await transaction.commit();
        res.send({modified});
    } catch (e) {
        await transaction.rollback();
        next(e);
    }
};