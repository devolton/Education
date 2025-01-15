import * as Yup from 'yup'


const mediaAssetValidationSchema = Yup.object().shape({
    alt:Yup.string()
        .min(2,'Minimum 2 symbols')
        .max(32, 'Maximum 32 symbols')

})

export {mediaAssetValidationSchema}