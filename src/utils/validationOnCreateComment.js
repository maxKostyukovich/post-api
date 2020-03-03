import * as yup from 'yup';
module.exports = yup.object().strict(true).shape({
    text: yup.string()
        .required('First name is required'),
    PostId: yup.number()
        .required('Post id is required'),
    time: yup.date()
});