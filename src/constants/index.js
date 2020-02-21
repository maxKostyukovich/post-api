const PORT = 5000;
const TOKEN_TYPE = {
  ACCESS: 'ACCESS'
};
const JWT = {
  secretKey: 'dnbwbo23b32mnxco34nz',
  access: {
      type: TOKEN_TYPE.ACCESS,
      expiresIn: '60m',
  }
};
const SALT = 9;
const MULTER_TIME_FORMAT = 'x';
const POST_IMAGES_PATH = '/static/postImages/';
module.exports = {
    PORT,
    TOKEN_TYPE,
    JWT,
    SALT,
    MULTER_TIME_FORMAT,
    POST_IMAGES_PATH,
};
