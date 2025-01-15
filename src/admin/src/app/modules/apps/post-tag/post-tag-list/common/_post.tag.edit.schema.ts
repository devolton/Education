import * as Yup from 'yup'

const postTagEditSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
})
export {postTagEditSchema}