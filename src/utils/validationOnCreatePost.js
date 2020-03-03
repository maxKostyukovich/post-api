import * as yup from 'yup';
module.exports = yup.object().strict(true).shape({
    title: yup.string()
        .required('Title is required'),
    description: yup.string()
        .required('Description is required'),
    topic: yup.string()
        .required('Topic is required'),
    date: yup.string()
        .required('Date is required')
});