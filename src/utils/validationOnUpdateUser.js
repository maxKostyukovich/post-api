import * as yup from 'yup';
module.exports = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    age: yup.number()
        .integer('Age must be integer'),
    country: yup.string()
});