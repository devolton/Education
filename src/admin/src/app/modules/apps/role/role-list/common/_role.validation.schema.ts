import * as Yup from 'yup'

const roleValidationSchema = Yup.object().shape({
    value: Yup.string()
        .matches(/^[a-z]{4,16}/, { message: 'Role must contain only lowercase letters' })
        .min(4,'Min 4 symbols')
        .max(16, 'Max 16 symbols'),
    description:Yup.string()
        .min(4,'Min 4 symbols')
        .max(256, 'Max 265 symbols')
})

export {roleValidationSchema}