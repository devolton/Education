import * as Yp from 'yup'
import * as Yup from "yup";

const loginFormValidationSchema = Yup.object().shape({
    newLogin: Yup.string()
        .min(2, 'Minimum 2 symbols')
        .max(32, 'Maximum 32 symbols')
        .matches(/^[a-z0-9._]{2,32}$/, { message: 'Login must be between 2 and 32 characters long and can only contain lowercase letters, numbers, dots, and underscores.' })
        .required('Login is required'),
    confirmPassword: Yup.string()
        .min(8, 'Minimum 8 symbols')
        .max(32, 'Maximum 32 symbols')
        // .matches(/^(?=.*[A-Z])(?=.*\\\\d)[A-Za-z0-9_]{8,32}$/, {message: 'Password must be between 8 and 32 characters long, contain at least one uppercase letter, one digit, and only letters, numbers, or underscores'})
        .required('Password is required'),
})

export {loginFormValidationSchema}