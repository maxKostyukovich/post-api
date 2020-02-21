import express from 'express';
import multer from 'multer';
import userController from '../controllers/userController';
import accountController from '../controllers/accountController';
import postController from '../controllers/postController';
import commentController from '../controllers/commentController';
import hashPassMiddleware from '../middlewares/hashPasswordMiddleware';
import tokenVerifyMiddleware from '../middlewares/tokenVerifyMiddleware';
import isPaidCheckMiddleware from '../middlewares/isPaidCheckMiddleware';
import creditCardController from '../controllers/creditCardController';
import validation from '../middlewares/validationMiddleware';
import createUserValidationScheme from '../utils/validationOnCreateUser';
import createPostValidationScheme from '../utils/validationOnCreatePost';
import createCommentValidationScheme from '../utils/validationOnCreateComment';
import updateUserValidationSchema from '../utils/validationOnUpdateUser';
import createDiskStorageConfig from '../middlewares/multer/createDiskStorageConfig';

const upload = multer({storage : createDiskStorageConfig(multer, __dirname, '../../public/static/images/postImages')});
const router = express.Router();

router.get('/user/:id', userController.get);
router.get('/user', userController.getAll);
router.post('/user', tokenVerifyMiddleware, validation(createUserValidationScheme), userController.create);
router.put('/user/:id', tokenVerifyMiddleware, validation(updateUserValidationSchema), userController.update);
router.delete('/user/:id', tokenVerifyMiddleware, userController.delete);

router.post('/account', hashPassMiddleware, accountController.create);
router.post('/login', accountController.login);
router.get('/account/:id', accountController.get);//for test

router.post('/credit-card', tokenVerifyMiddleware, creditCardController.create);
router.delete('/credit-card/:id', tokenVerifyMiddleware, creditCardController.delete);

router.post('/post', tokenVerifyMiddleware, isPaidCheckMiddleware, upload.single('mainImg'), validation(createPostValidationScheme), postController.create);
router.get('/post', tokenVerifyMiddleware, isPaidCheckMiddleware, postController.getAll);
router.get('/post/:id', tokenVerifyMiddleware, isPaidCheckMiddleware, postController.get);
router.put('/post/:id', tokenVerifyMiddleware, isPaidCheckMiddleware, upload.single('mainImg'), postController.update);
router.delete('/post/:id', tokenVerifyMiddleware, isPaidCheckMiddleware, postController.delete);

router.post('/comment', tokenVerifyMiddleware, isPaidCheckMiddleware, validation(createCommentValidationScheme), commentController.create);
router.delete('/comment/:id', tokenVerifyMiddleware, isPaidCheckMiddleware, commentController.delete);
router.get('/comment/:id', commentController.get);


module.exports = router;