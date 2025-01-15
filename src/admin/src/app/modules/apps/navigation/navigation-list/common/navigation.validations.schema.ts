import * as Yup from 'yup'

const navigationValidationsSchema = Yup.object().shape({
    href: Yup.string()
        .min(2, 'Min 2 symbols'),
    title: Yup.string()
        .min(2, 'Min 2 symbols'),
    order: Yup.number()
        .min(1),
    parentId: Yup.number()
        .min(1)
})
export {navigationValidationsSchema}