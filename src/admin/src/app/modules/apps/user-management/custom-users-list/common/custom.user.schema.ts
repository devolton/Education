import * as Yup from "yup";

const editUserSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(6, 'Minimum 6 symbols')
        .max(64, 'Maximum 64 symbols')
        .required('Email is required'),
    name: Yup.string()
        .min(2, 'Minimum 2 symbols')
        .max(32, 'Maximum 32 symbols')
        .matches(/^[A-Za-zА-Яа-яЁё]{2,32}$/,{message:'Name must be between 2 and 32 characters long and contain only letters'})
        .required('Name is required'),
    surname: Yup.string()
        .min(4, 'Minimum 4 symbols')
        .max(32, 'Maximum 32 symbols')
        .matches(/^[A-Za-zА-Яа-яЁё]{4,32}$/, {message:'Surname must be between 4 and 32 characters long and contain only letters'})
        .required('Surname is required'),
    login: Yup.string()
        .min(2, 'Minimum 2 symbols')
        .max(64, 'Maximum 64 symbols')
        .matches(/^[a-z0-9._]{2,32}$/,{message:'Login must be between 2 and 32 characters long and can only contain lowercase letters, numbers, dots, and underscores.'} )
        .required('Surname is required'),
    middleName: Yup.string()
        .min(4, 'Minimum 4 symbols')
        .max(32, 'Maximum 32 symbols')
        .matches(/^[A-Za-zА-Яа-яЁё]{4,32}$/,{message:'Middle name must be between 4 and 32 characters long and contain only letters'})
        .required('Surname is required'),
    password:Yup.string()
        .min(8)
        .max(32)
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9_]{8,32}$/,{message:'Password must be between 8 and 32 characters long, contain at least one uppercase letter, one digit, and only letters, numbers, or underscores'})

})
export {editUserSchema}