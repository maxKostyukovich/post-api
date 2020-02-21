import express from 'express'
import cors from 'cors';
import {PORT} from './constants';
import router from './router';
import errorHandler from './errorHandlers/errorHandler';

const app = express();

app.use('/static',express.static(process.cwd() + '/public/static/images'));
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
app.listen(PORT);