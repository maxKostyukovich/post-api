import  ApplicationError from'./ApplicationError'

class ValidationError extends ApplicationError {
    constructor(message) {
        super(message || 'Something wrong with validation', 400);
    }
}

module.exports = ValidationError;