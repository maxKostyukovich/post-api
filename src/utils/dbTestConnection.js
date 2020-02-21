import db from '../models'
import { ConnectionError } from "sequelize";
import DBError from '../errorHandlers/DBError'
module.exports = (req, res, next) => {
        db.sequelize.authenticate()
            .then(err => {
                next();
            })
            .catch(err => {
                if(err instanceof ConnectionError){
                    err.message = "Db Connection error";
                    return next(err);
                }
                next(new DBError('Db error'))
            })
};