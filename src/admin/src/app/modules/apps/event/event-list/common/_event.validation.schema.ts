import * as Yup from 'yup'


const eventValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(2, 'Minimum 2 symbols')
        .max(128, 'Max 128 symbols'),
    slug: Yup.string()
        .required('Slug is required and must be unique!')
        .min(2, 'Minimum 2 symbols!')
        .max(64, 'Maximum 64 symbols!'),
    shortDescription: Yup.string()
        .required('Short description is required!')
        .min(2, 'Minimum 2 symbols!')
        .max(256, 'Maximum 256 symbols'),
    fullDescription: Yup.string()
        .required('Description is required!')
        .min(2, 'Minimum 2 symbols')
        .max(2048, 'Maximum 2048 symbols!'),
    company: Yup.string()
        .required('Company is required!')
        .min(2, 'Minimum 2 symbols')
        .max(64, 'Maximum 64 symbols!'),
    ticketPrice: Yup.number()
        .required('Ticket price is required!')
        .min(1, 'Minimum price is 1 '),
    generalTicketCount: Yup.number()
        .required('Ticket count is required!')
        .min(1, 'Min tickets count is 1 ')
        .max(1000, 'Max ticket price is 1000'),
    city: Yup.string()
        .required('City is required!')
        .min(2, 'Minimum 2 symbols!')
        .max(32, 'Maximum 32 symbols!'),
    street: Yup.string()
        .required('Street is required!')
        .min(2, 'Minimum 2 symbols!')
        .max(128, 'Maximum 128 symbols!'),
    startDate: Yup.date()
        .required('Start date is required')
        .max(Yup.ref('endDate'), 'Start date must be before end date'),
    endDate: Yup.date()
        .required('End date is required')
        .min(Yup.ref('startDate'), 'End date must be after start date'),
})
export {eventValidationSchema}