import {FC, useEffect, useMemo, useState} from 'react'
import {useFormik} from 'formik'
import {ID, isNotEmpty, QUERIES, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'


import {CreateOptionDto, Option, UpdateOptionDto} from "../core/_option.model.ts";
import {useOptionQueryResponse} from "../core/OptionQueryResponseProvider.tsx";
import {useListView} from "../core/OptionListViewProvider.tsx";
import {editOptionSchema} from "../common/edit.option.schema.ts";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {createOption, updateOption} from "../core/_option.request.ts";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";


type Props = {
    isLoading: boolean
    option: Option,

}




const OptionEditModalForm: FC<Props> = ({option, isLoading}) => {
    const {setItemIdForUpdate} = useListView()
    const {refetch} = useOptionQueryResponse();

    const [optionForEdit] = useState<Option>({
        ...option,


    })

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }



    const formik = useFormik({
        initialValues: optionForEdit,
        validationSchema: editOptionSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                   let optionForUpdated:UpdateOptionDto= {
                       name:formik.values.name,
                       value:formik.values.value,
                       relation:formik.values.relation
                   }
                   updateOption(option.id,optionForUpdated);

                } else {
                    let optionForCreate:CreateOptionDto={
                        name:formik.values.name,
                        value:formik.values.value,
                        relation:formik.values.relation
                    }
                    createOption(optionForCreate);


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
                    <EditModalInput title={'Name'} formik={formik} fieldName={'name'}
                                                  isLoading={isLoading}/>
                    <EditModalInput title={'Value'} formik={formik} fieldName={'value'}
                                                  isLoading={isLoading}/>

                    <EditModalInput title={'Relation'} formik={formik} fieldName={'relation'}
                                                  isLoading={isLoading}/>




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

export {OptionEditModalForm}
