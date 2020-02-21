import ValidationError from'../errorHandlers/ValidationError';

module.exports = (validationScheme) => {
    return function (req, res, next){
        validationScheme.validate(req.body)
            .then(() => next())
            .catch(err => next(new ValidationError(err.message)))
    }
};