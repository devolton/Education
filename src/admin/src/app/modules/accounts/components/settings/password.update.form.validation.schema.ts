import * as Yup from "yup";

const passwordFormValidationSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(8, 'Minimum 8 symbols')
        .max(32, 'Maximum 32 symbols')
        .required('Password is required')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9_]{8,32}$/, {message: 'Password must be between 8 and 32 characters long, contain at least one uppercase letter, one digit, and only letters, numbers, or underscores'}),
    newPassword: Yup.string()
        .min(8, 'Minimum 8 symbols')
        .max(32, 'Maximum 32 symbols')
        .required('Password is required')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9_]{8,32}$/,{message:'Password must be between 8 and 32 characters long, contain at least one uppercase letter, one digit, and only letters, numbers, or underscores'}),
    passwordConfirmation: Yup.string()
        .min(8, 'Minimum 8 symbols')
        .max(32, 'Maximum 32 symbols')
        .required('Password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
})

export {passwordFormValidationSchema}