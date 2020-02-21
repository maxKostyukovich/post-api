import ApplicationError from  './ApplicationError';

class DBError extends ApplicationError {
    constructor(message) {
        super(message || 'DB Error', 500);
    }
}
module.exports = DBError;