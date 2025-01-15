import * as Yup from "yup";

const profileDetailsSchema = Yup.object().shape({
    avatarPath:Yup.string(),
    surname: Yup.string().required('Surname is required'),
    name: Yup.string().required('Name is required'),
    middleName: Yup.string().required('Middle name is required'),
    login:Yup.string().required('Login is required')


})
export {profileDetailsSchema}