import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errorHandlers/UnauthorizedError';
import { JWT } from '../constants';
module.exports = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if(!authHeader){
            return next(new UnauthorizedError());
        }
        const token = authHeader.replace('Bearer ', '');
        const payload = jwt.verify(token, JWT.secretKey);
        if(payload.type !== JWT.access.type){
            return next(new UnauthorizedError('Invalid token'));
        }
        req.payload = payload;
        next();
    }catch (err) {
        if(err instanceof jwt.TokenExpiredError){
            next(new UnauthorizedError('Token expired'));
        } else
        if (err instanceof jwt.JsonWebTokenError) {
            next(new UnauthorizedError('Invalid token'));
        } else {
            next(err);
        }
    }
};