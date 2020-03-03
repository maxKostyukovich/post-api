import * as yup from 'yup';
module.exports = yup.object().strict(true).shape({
    firstName: yup.string()
        .required('First name is required'),
    lastName: yup.string()
        .required('Last name is required'),
    age: yup.number()
        .required('Age is required'),
    country: yup.string()
        .required('Country is required')
});