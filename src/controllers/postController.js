import db from '../models'
import moment from 'moment'
import NotFoundError from '../errorHandlers/NotFoundError'
import { POST_IMAGES_PATH } from '../constants'
import { sequelize } from '../models'
import fs from 'fs';
const Post = db.Post;
const Account = db.Account;
const Comment = db.Comment;
module.exports.create = async (req, res, next) => {
    try {
        const post = req.body;
        post.mainImg = req.file.filename;
        post.date = moment(post.date, 'YYYY-MM-DD HH:mm').utc().format();
        const account = await Account.findByPk(req.payload.id);
        if (!account) {
            return next(new NotFoundError('Account was not found'));
        }
        post.AccountId = account.id;
        console.log(post.date);
        const result = await Post.create(post);
        res.send(result);
    } catch (e) {
        next(e);
    }
};

module.exports.update = async (req, res, next) => {
    try {
        let post = req.body;
        const oldPost = await Post.findByPk(req.params.id);
        if (!oldPost) {
            return next(new NotFoundError('Post was not found'));
        }

        if (req.file) {
            fs.unlink("public/static/images/postImages/" + oldPost.mainImg, (err) => {
                if (err) throw err
            });
            post.mainImg = req.file.filename;
        }
        if(post.date) {
            post.date = moment(post.date).utc().format('YYYY-MM-DD HH:mm');
        }
        post.AccountId = undefined;
        await Post.update(post, {where: {id: req.params.id}});
        res.status(201).send();
    }catch (e) {
        next(e)
    }
};

module.exports.delete = async (req, res, next) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const post = await Post.findByPk(req.params.id);
        const modified = await Post.destroy({where: {id: req.params.id}, cascade: true}, transaction);
        if (modified < 1) {
            return next(new NotFoundError('Post was not found'));
        }
        fs.unlink("public/static/images/postImages/" + post.mainImg, (err) => {
            if (err) throw err
        });
        await transaction.commit();
        res.send({modified})
    } catch (e) {
        await transaction.rollback();
        next(e);
    }
};

module.exports.get = async (req, res, next) => {
    const post = await Post.findAll({where: {id: req.params.id}, include: [{model:Comment}]});
    if(post.length<1){
        return next(new NotFoundError('Post was not found'))
    }
    post[0].mainImg = POST_IMAGES_PATH + post[0].mainImg
    res.send(post[0]);
};

module.exports.getAll = async (req, res, next) => {
    const topic = req.query.topic;
    let posts;
    if(topic){
        posts = await Post.findAll({where: {topic}})
    } else {
        posts = await Post.findAll();
    }
    posts.forEach((value) => {
       value.mainImg =  POST_IMAGES_PATH + value.mainImg;
    });
    res.send(posts);
};