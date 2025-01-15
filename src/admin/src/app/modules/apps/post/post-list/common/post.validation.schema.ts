import * as Yup from 'yup'


const postValidationSchema = Yup.object().shape({
    authorId: Yup.number()
        .min(1)
        .required('Please select author'),
    title:Yup.string()
        .min(2,'Min 2 symbols')
        .max(256, 'Max 256 symbols')
        .required(),
    content:Yup.string()
        .min(8,'Min 8 symbols')
        .max(2048, 'Max 2048 symbols')
        .required(),
    shortDescription:Yup.string()
        .min(2,'Min 2 symbols')
        .max(256, 'Max 256 symbols')
        .required(),
    slug:Yup.string()
        .min(2,'Min 2 symbols')
        .max(32,'Max 32 symbols')
        .required(),


});
export {postValidationSchema}