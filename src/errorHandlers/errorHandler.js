import {ValidationError} from "sequelize";
import ValidationErr from "./ValidationError";

module.exports = (err, req, res, next,) => {
    if(err instanceof ValidationError){
        const validErr = new ValidationErr(err.errors[0].message);
        res.status(validErr.status).send(validErr.message);
    } else if(err.status){
        res.status(err.status).send(err.message);
    }else {
        res.status(500).send(err.message);
    }
};