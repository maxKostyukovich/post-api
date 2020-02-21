import db from '../models'
import NotFoundError from '../errorHandlers/NotFoundError'
import moment from "moment";
const Comment = db.Comment;
const Account = db.Account;

module.exports.create = async (req, res, next) => {
    try {
        const AccountId = req.payload.id;
        const comment = req.body;
        comment.AccountId = AccountId;
        comment.date = moment().utc().format();//UTC
        const savedComment = await Comment.create(comment);
        res.send(savedComment);
    } catch (e) {
        next(e);
    }
};

module.exports.delete = async (req, res, next) => {
    const modified = await Comment.destroy({where:{id:req.params.id}});
    if(modified < 1){
        return next(new NotFoundError('Comment was not found'))
    }
    res.send({modified});
};

module.exports.get = async (req, res, next) => {
    const comment = await Comment.findByPk(req.params.id);
    res.send(comment)
};

