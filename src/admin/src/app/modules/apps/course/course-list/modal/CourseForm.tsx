import {FC, useEffect, useMemo, useState} from 'react'
import {useFormik} from 'formik'
import {isNotEmpty, SelectMappingEntity} from '../../../../../../_metronic/helpers'

import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";

import {EditImageBlock, IImageProps} from "../../../common/components/modal/EditImageBlock.tsx";
import {Config} from "../../../../../../env.config.ts";

import {useCourseViewList} from "../core/CourseViewListProvider.tsx";
import {useCourseResponse} from "../core/CourseQueryResponseProvider.tsx";
import {
    Course,
    CreateCourseDto,
    CreateCourseScheduleDto,
    DaysOfWeek,
    UpdateCourseDto,
    UpdateCourseScheduleDto
} from "../core/_course.model.ts";
import {courseValidationSchema} from "../common/_course.validation.schema.ts";
import {
    createCourse,
    removeCoursePoster,
    removeCourseThumbnail, updateCourse,
    updateCoursePoster,
    updateCourseThumbnail
} from "../core/_course.request.ts";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";
import {EditModalTextAreaBlock} from "../../../common/components/modal/EditModaTextAreaBlock.tsx";
import {EditModalTimePickerBlock} from "../../../common/components/modal/EditModalTimePickerBlock.tsx";
import {EditModalPriceNumberInput} from "../../../common/components/modal/EditModalPriceNumberInput.tsx";
import {EditModalDateTimePickerBlock} from "../../../common/components/modal/EditModalDateTimePickerBlock.tsx";
import {EditModalGridBlock} from "../../../common/components/modal/EditModalGridBlock.tsx";


type Props = {
    isLoading: boolean
    course: Course,

}

const priceProps = {
    min: 1,
    max: 1000
}


const CourseForm: FC<Props> = ({course, isLoading}) => {
    const {setItemIdForUpdate} = useCourseViewList();
    const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File>(null);
    const [selectedPosterFile, setSelectedPosterFile] = useState<File>(null);
    const [days, setDays] = useState<Array<SelectMappingEntity>>([]);
    const [lessons, setLessons] = useState<Array<SelectMappingEntity>>([])
    const {refetch} = useCourseResponse();

    const [courseForEdit] = useState<Course>({
        ...course

    })
    const thumbnailProps: IImageProps = {
        imagePath: course.thumbnailPath,
        initialPath: Config.PATH.ASSETS.EVENT.DEFAULT_THUMBNAIL,
        entityId: course.id
    }
    const posterProps: IImageProps = {
        imagePath: course.posterPath,
        initialPath: Config.PATH.ASSETS.EVENT.DEFAULT_POSTER,
        entityId: course.id
    }

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }


    const formik = useFormik({
        initialValues: {
            id: courseForEdit.id,
            title: courseForEdit.title,
            fullDescription: courseForEdit.fullDescription,
            shortDescription: courseForEdit.shortDescription,
            thumbnailPath: courseForEdit.thumbnailPath,
            posterPath: courseForEdit.posterPath,
            startDate: courseForEdit.courseSchedule.dateOfStart,
            endDate: courseForEdit.courseSchedule.dateOfEnd,
            classStartTime: courseForEdit.courseSchedule.classStartTime,
            classEndTime: courseForEdit.courseSchedule.classEndTime,
            price: courseForEdit.price,
            slug: course.slug,
            daysIndexes: (courseForEdit.id === undefined) ? [] : courseForEdit.courseSchedule.days.map((day) => {
              return Object.values(DaysOfWeek).indexOf(day)
            }),
            lessonsIds:(courseForEdit.id===undefined)?[] :courseForEdit.lessons.map(lesson=>lesson.id)

        },
        validationSchema: courseValidationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    let updateCourseDto:UpdateCourseDto={
                        title:values.title,
                        shortDescription:values.shortDescription,
                        fullDescription:values.fullDescription,
                        slug:values.slug,
                        price:values.price
                    };
                    let updateCourseScheduleDto:UpdateCourseScheduleDto={
                        dateOfStart:values.startDate,
                        dateOfEnd:values.endDate,
                        classStartTime:values.classStartTime,
                        classEndTime:values.classEndTime,
                        dayIds:values.daysIndexes

                    };
                    await updateCourse(course.id,updateCourseDto,updateCourseScheduleDto);

                } else {
                    let createCourseDto:CreateCourseDto={
                        title:values.title,
                        shortDescription:values.shortDescription,
                        fullDescription:values.fullDescription,
                        thumbnailPath:Config.PATH.ASSETS.COURSE.DEFAULT_THUMBNAIL,
                        posterPath:Config.PATH.ASSETS.COURSE.DEFAULT_POSTER,
                        slug:values.slug,
                        price:values.price

                    }
                    let createCourseScheduleDto:CreateCourseScheduleDto={
                        dateOfStart:values.startDate,
                        dateOfEnd:values.endDate,
                        classStartTime:values.classStartTime,
                        classEndTime:values.classEndTime,
                        dayIds:values.daysIndexes
                    }
                    await createCourse(createCourseDto,createCourseScheduleDto,selectedPosterFile,selectedThumbnailFile);

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

        let tempDays: Array<SelectMappingEntity> = [];
        Object.keys(DaysOfWeek).forEach((key, index) => {
            if (isNaN(Number(key))) {
                tempDays.push({
                    id: index,
                    title: DaysOfWeek[key as keyof typeof DaysOfWeek]
                });
            }
        });
        setDays(tempDays);


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
                                        removeFunc={removeCourseThumbnail}
                                        updateFunc={updateCourseThumbnail}
                                        setSelectedFile={setSelectedThumbnailFile}
                                        refetch={refetch}/>
                        <EditImageBlock imageProps={posterProps}
                                        title={'Poster'}
                                        refetch={refetch}
                                        updateFunc={updateCoursePoster}
                                        removeFunc={removeCoursePoster}
                                        setSelectedFile={setSelectedPosterFile}/>

                    </div>

                    {/* begin::Input group */}
                    <EditModalInput title={'Title'} fieldName={'title'} formik={formik} isLoading={isLoading}/>
                    <EditModalTextAreaBlock title={'Short description'} formik={formik} fieldName={'shortDescription'}
                                            isLoading={isLoading}/>
                    <EditModalTextAreaBlock title={'Full description'} formik={formik} fieldName={'fullDescription'}
                                            isLoading={isLoading}/>
                    <EditModalTimePickerBlock title={'Lesson start time'} time={formik.values.classStartTime}
                                              fieldName={'classStartTime'} formik={formik} isLoading={isLoading}/>
                    <EditModalTimePickerBlock title={'Lesson end time'} time={formik.values.classEndTime}
                                              fieldName={'classEndTime'} formik={formik} isLoading={isLoading}/>
                    <EditModalInput title={'Slug'} fieldName={'slug'} formik={formik} isLoading={isLoading}/>
                    <EditModalPriceNumberInput title={'Price'} minPrice={priceProps.min} maxPrice={priceProps.max}
                                               formik={formik} fieldName={'price'} isLoading={isLoading}/>
                    <EditModalDateTimePickerBlock title={'Course start date'} dateTime={formik.values.startDate}
                                                  fieldName={'startDate'} formik={formik} isLoading={isLoading}/>
                    <EditModalDateTimePickerBlock title={'Course end date'} dateTime={formik.values.endDate}
                                                  fieldName={'endDate'} formik={formik} isLoading={isLoading}/>
                    {days.length> 0 &&
                        <EditModalGridBlock entities={days} title={'Days'} formik={formik} fieldName={'daysIndexes'}/>
                    }

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

export {CourseForm}
