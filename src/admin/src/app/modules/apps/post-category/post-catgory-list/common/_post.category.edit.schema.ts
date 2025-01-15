import * as Yup from "yup"
const postCategoryEditSchema = Yup.object().shape({
    name:Yup.string()
        .required('Name is require')
        .min(2,"Minimum 2 symbols")
        .max(32,"Maximum 32 symbols"),
    description:Yup.string()
        .min(8,"Minimum 8 symbols")
        .max(128,'Maximum 128 symbols')

});
export {postCategoryEditSchema}