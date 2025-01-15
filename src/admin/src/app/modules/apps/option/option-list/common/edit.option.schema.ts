import * as Yup from "yup";
const editOptionSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Minimum 2 symbols')
        .max(32, 'Maximum 32')
        .required('Name is required'),
    value:Yup.string()
        .min(4,"Minimum 4 symbols")
        .max(64,'Maximum 64 symbols')
        .required('Value is required'),
    relation:Yup.string()
        .min(2,'Minimum 2 symbols')
        .max(32, 'Maximum 32 symbols')
})
export {editOptionSchema}