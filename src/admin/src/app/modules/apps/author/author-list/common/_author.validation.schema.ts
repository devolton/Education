import * as Yup from 'yup'

const authorValidationSchema = Yup.object().shape({
    fullName:Yup.string()
        .min(2,'Minimum 2 symbols')
        .max(64,'Maximum 64 symbols')
        .required('Full name is required')
        .matches(/^[A-Z][a-z]+(?: [A-Z][a-z]+){1,2}$/, {message:'Example: Kovalenko Stepan Romanovich'}),
    slogan:Yup.string()
        .min(4,'Minimum 4 symbols')
        .max(256, 'Maximum 256 symbols')
        .required('Slogan is required'),
    instagramHref:Yup.string()
        .min(8,'Minimum 8 symbols')
        .max(128, 'Maximum 128 symbols')
        .required()
        .matches(/^(https?:\/\/[^\s]+|#[^\s]*)$/,{message:'Invalid href'}),
    twitterHref:Yup.string()
        .min(8,'Minimum 8 symbols')
        .max(128, 'Maximum 128 symbols')
        .required()
        .matches(/^(https?:\/\/[^\s]+|#[^\s]*)$/,{message:'Invalid href'}),
    facebookHref:Yup.string()
        .min(8,'Minimum 8 symbols')
        .max(128, 'Maximum 128 symbols')
        .required()
        .matches(/^(https?:\/\/[^\s]+|#[^\s]*)$/,{message:'Invalid href'})

});

export {authorValidationSchema}