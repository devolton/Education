import {FC, useEffect, useState} from 'react'
import {useFormik} from 'formik'
import {isNotEmpty, SelectMappingEntity} from '../../../../../../_metronic/helpers'
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {useNavigationListView} from "../core/NavigationListViewProvider.tsx";
import {useNavigationQueryResponse} from "../core/NavigationQueryResponseProvider.tsx";
import {CreateNavigationDto, Navigation, UpdateNavigationDto} from "../core/_navigation.model.ts";
import {navigationValidationsSchema} from "../common/navigation.validations.schema.ts";
import {createNavigation, getNavigations, updateNavigation} from "../core/_navigation.request.ts";
import {EditModalSelect} from "../../../common/components/modal/EditModalSelect.tsx";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";


type Props = {
    isLoading: boolean
    navigation: Navigation,

}


const NavigationEditModalForm: FC<Props> = ({navigation, isLoading}) => {
    const {setItemIdForUpdate} = useNavigationListView()
    const {refetch} = useNavigationQueryResponse();
    const [navigationsCollection, setNavigationsCollection] = useState<Array<SelectMappingEntity>>([]);

    const [navigationForEdit] = useState<Navigation>({
        ...navigation,
    })

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }


    const formik = useFormik({
        initialValues: navigationForEdit,
        validationSchema: navigationValidationsSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    let updateNavigationDto:UpdateNavigationDto={
                        href:values.href,
                        title:values.title,
                        order:values.order,
                        parentId:values.parentId,
                    }
                    await updateNavigation(navigation.id,updateNavigationDto);


                } else {
                   let createNavigationDto:CreateNavigationDto={
                       href:values.href,
                       title:values.title,
                       order:values.order,
                       parentId:values.parentId,
                   }
                   await createNavigation(createNavigationDto);

                }
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
                cancel(true)
            }
        },
    })
    useEffect(() => {
        getNavigations('')
            .then(res=>{
                let navigations = res.data.filter(nav=>nav.id!==navigation.id);
                let tempMappingCollection:Array<SelectMappingEntity> = [];
                navigations.forEach((nav)=>{
                    tempMappingCollection.push({
                        id:nav.id,
                        title:nav.title
                    })
                })
                setNavigationsCollection(tempMappingCollection);
            })

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
                    {/* begin::Input group */}
                    <EditModalInput title={'Href'} fieldName={'href'} formik={formik} isLoading={isLoading}/>
                    <EditModalInput title={'Title'} fieldName={'title'} formik={formik}
                                              isLoading={isLoading}/>
                    <EditModalInput title={'Order'} fieldName={'order'} formik={formik}
                                              isLoading={isLoading}/>
                    {navigationsCollection.length>0 && <EditModalSelect entityCollection={navigationsCollection} title={'Parent node'} formik={formik} fieldName={'parentId'}/>}


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
            {(formik.isSubmitting || isLoading) && <UsersListLoading/>}
        </>
    )
}

export {NavigationEditModalForm}
