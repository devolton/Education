import {FC, useEffect, useMemo, useState} from 'react'
import {useFormik} from 'formik'
import {isNotEmpty, SelectMappingEntity} from '../../../../../../_metronic/helpers'

import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";

import {EditImageBlock, IImageProps} from "../../../common/components/modal/EditImageBlock.tsx";

import {
    CreateEventDetailDto,
    CreateEventDto,
    CreateEventVenueDto,
    Event,
    UpdateEventDetailDto,
    UpdateEventDto,
    UpdateEventVenueDto
} from '../core/_event.model.ts'
import {useEventListView} from "../core/EventQueryListViewProvider.tsx";
import {useEventResponse} from "../core/EventQueryResponseProvider.tsx";
import {eventValidationSchema} from "../common/_event.validation.schema.ts";
import {
    createEvent,
    removeEventPoster,
    removeEventThumbnail, updateEvent,
    updateEventPoster,
    updateEventThumbnail
} from "../core/_event.request.tsx";
import {Config} from "../../../../../../env.config.ts";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";
import {EditModalTextAreaBlock} from "../../../common/components/modal/EditModaTextAreaBlock.tsx";
import {EditModalNumberInput} from "../../../common/components/modal/EditModalNumberInput.tsx";
import {EditModalPriceNumberInput} from "../../../common/components/modal/EditModalPriceNumberInput.tsx";
import {EditModalDateTimePickerBlock} from "../../../common/components/modal/EditModalDateTimePickerBlock.tsx";


type Props = {
    isLoading: boolean
    event: Event,

}


const EventEditModalForm: FC<Props> = ({event, isLoading}) => {
    const {setItemIdForUpdate} = useEventListView();
    const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File>(null);
    const [selectedPosterFile, setSelectedPosterFile] = useState<File>(null);
    const {refetch} = useEventResponse();

    const [eventForEdit] = useState<Event>({
        ...event
    })
    const thumbnailProps: IImageProps = {
        imagePath: event.thumbnailPath,
        initialPath: Config.PATH.ASSETS.EVENT.DEFAULT_THUMBNAIL,
        entityId: event.id
    }
    const posterProps: IImageProps = {
        imagePath: event.posterPath,
        initialPath: Config.PATH.ASSETS.EVENT.DEFAULT_POSTER,
        entityId: event.id
    }

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }


    const formik = useFormik({
        initialValues: {
            id: eventForEdit.id,
            title: eventForEdit.title,
            slug: eventForEdit.slug,
            shortDescription: eventForEdit.shortDescription,
            fullDescription: eventForEdit.fullDescription,
            thumbnailPath: eventForEdit.thumbnailPath,
            posterPath: eventForEdit.posterPath,
            generalTicketCount: eventForEdit.eventDetail.numberOfPlaces,
            ticketPrice: eventForEdit.eventDetail.ticketPrice,
            company: eventForEdit.eventDetail.company,
            startDate: eventForEdit.eventVenue.startDate,
            endDate: eventForEdit.eventVenue.endDate,
            street: eventForEdit.eventVenue.street,
            city: eventForEdit.eventVenue.city,
        },
        validationSchema: eventValidationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    let updateEventDto: UpdateEventDto = {
                        fullDescription: values.fullDescription,
                        shortDescription: values.shortDescription,
                        slug: values.slug,
                        title: values.title,
                    };
                    let updateEventVenueDto: UpdateEventVenueDto = {
                        city: values.city,
                        street: values.street,
                        startDate: values.startDate,
                        endDate: values.endDate
                    };
                    let updateEventDetailDto: UpdateEventDetailDto = {
                        company: values.company,
                        ticketPrice: values.ticketPrice,
                        numberOfPlaces: values.generalTicketCount
                    }
                    await updateEvent(event.id, updateEventDto, updateEventVenueDto, updateEventDetailDto);


                } else {
                    let createEventDto: CreateEventDto = {
                        title: values.title,
                        shortDescription: values.shortDescription,
                        fullDescription: values.fullDescription,
                        slug: values.slug,
                        thumbnailPath: Config.PATH.ASSETS.EVENT.DEFAULT_THUMBNAIL,
                        posterPath: Config.PATH.ASSETS.EVENT.DEFAULT_POSTER
                    };
                    let createEventVenueDto: CreateEventVenueDto = {
                        city: values.city,
                        street: values.street,
                        startDate: values.startDate,
                        endDate: values.endDate
                    };
                    let createEventDetailDto: CreateEventDetailDto = {
                        company: values.company,
                        numberOfPlaces: values.generalTicketCount,
                        ticketPrice: values.ticketPrice
                    }
                    await createEvent(createEventDto,
                        createEventVenueDto,
                        createEventDetailDto,
                        selectedThumbnailFile,
                        selectedPosterFile);

                }
                refetch();


            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
                cancel(true)
            }
        },
    })
    useEffect(() => {
    }, [])

    return (
        <>
            <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
                {/* begin::Scroll */}
                <div
                    className='d-flex flex-column scroll-y me-n7 pe-7'
                    id='kt_modal_add_user_scroll'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='auto'
                    data-kt-scroll-dependencies='#kt_modal_add_user_header'
                    data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                    data-kt-scroll-offset='300px'
                >
                    <div className='d-flex justify-content-around'>
                        <EditImageBlock imageProps={thumbnailProps}
                                        title={'Thumbnail'}
                                        removeFunc={removeEventThumbnail}
                                        updateFunc={updateEventThumbnail}
                                        setSelectedFile={setSelectedThumbnailFile}
                                        refetch={refetch}/>
                        <EditImageBlock imageProps={posterProps}
                                        title={'Poster'}
                                        refetch={refetch}
                                        updateFunc={updateEventPoster}
                                        removeFunc={removeEventPoster}
                                        setSelectedFile={setSelectedPosterFile}/>

                    </div>

                    {/* begin::Input group */}

                    <EditModalInput title={'Title'} fieldName={'title'} formik={formik} isLoading={isLoading}/>
                    <EditModalInput title={'Slug'} fieldName={'slug'} formik={formik} isLoading={isLoading}/>
                    <EditModalTextAreaBlock title={'Full description'} fieldName={'fullDescription'}
                                            formik={formik} isLoading={isLoading}/>
                    <EditModalTextAreaBlock title={'Short description'} fieldName={'shortDescription'} formik={formik}
                                            isLoading={isLoading}/>
                    <EditModalNumberInput title={'Ticket count'}
                                          formik={formik}
                                          minValue={5}
                                          maxValue={40}
                                          fieldName={'generalTicketCount'}
                                          isLoading={isLoading}/>
                    <EditModalPriceNumberInput title={'Price'} minPrice={0} maxPrice={10000} formik={formik}
                                               fieldName={'ticketPrice'} isLoading={isLoading}/>
                    <EditModalInput title={'Company'} fieldName={'company'} formik={formik} isLoading={isLoading}/>
                    <EditModalDateTimePickerBlock title='Start time' dateTime={formik.values.startDate}
                                                  formik={formik} isLoading={isLoading} fieldName={'startDate'}/>
                    <EditModalDateTimePickerBlock title='End time' dateTime={formik.values.endDate}
                                                  formik={formik} isLoading={isLoading} fieldName={'endDate'}/>
                    <EditModalInput title={'City'} fieldName={'city'} formik={formik} isLoading={isLoading}/>
                    <EditModalInput title={'Street'} fieldName={'street'} formik={formik} isLoading={isLoading}/>
                </div>
                {/* end::Scroll */}

                {/* begin::Actions */}
                <div className='text-center pt-15'>
                    <button
                        type='reset'
                        onClick={() => cancel()}
                        className='btn btn-light me-3'
                        data-kt-users-modal-action='cancel'
                        disabled={formik.isSubmitting || isLoading}
                    >
                        Discard
                    </button>

                    <button
                        type='submit'
                        className='btn btn-primary'
                        data-kt-users-modal-action='submit'
                        disabled={isLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
                    >
                        <span className='indicator-label'>Submit</span>
                        {(formik.isSubmitting || isLoading) && (
                            <span className='indicator-progress'>
                Please wait...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
                        )}
                    </button>
                </div>
                {/* end::Actions */}
            </form>
            {
                (formik.isSubmitting || isLoading) && <UsersListLoading/>
            }
        </>
    )
}

export {EventEditModalForm}
