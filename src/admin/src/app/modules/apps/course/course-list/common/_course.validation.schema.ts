import * as Yup from 'yup'


const courseValidationSchema = Yup.object().shape({
    title:Yup.string()
        .min(2,'Minimum symbols 2')
        .max(128,'Maximum symbols 128')
        .required(),
    shortDescription:Yup.string()
        .min(2,'Minimum 2 symbols')
        .max(256, 'Maximum 256 symbols')
        .required(),
    fullDescription:Yup.string()
        .min(4,'Minimum 4 symbols')
        .max(2048,'Maximum 2048 symbols')
        .required(),
    slug:Yup.string()
        .min(2,'Minumum 2 symbols')
        .max(32, 'Maximum 32 symbols')
        .required(),
    price:Yup.number()
        .required()
        .min(1,'The lower price is 1 $'),
    startDate: Yup.date()
        .required('Start date is required')
        .max(Yup.ref('endDate'), 'Start date must be before end date'),
    endDate: Yup.date()
        .required('End date is required')
        .min(Yup.ref('startDate'), 'End date must be after start date'),

});

export {courseValidationSchema}