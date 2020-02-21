import path from 'path'
import {MULTER_TIME_FORMAT} from "../../constants";
import moment from 'moment'

module.exports =  (multer, dirname, pathTo) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(dirname, pathTo))
        },
        filename: function (req, file, cb) {
            cb(null, `${moment().format(MULTER_TIME_FORMAT)}-${file.originalname}`);
        }
    });
};