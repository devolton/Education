import {FC, useEffect, useMemo, useState} from 'react'
import {useFormik} from 'formik'
import {ID, isNotEmpty, QUERIES, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'

import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {CreateRoleDto, Role, UpdateRoleDto} from "../core/_role.model.ts";
import {useRoleListView} from "../core/RoleListViewProvider.tsx";
import {useRoleQueryResponse} from "../core/RoleQueryResponseProvider.tsx";
import {roleValidationSchema} from "../common/_role.validation.schema.ts";
import {createRole, updateRole} from "../core/_role.request.ts";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";


type Props = {
    isLoading: boolean
    role: Role,

}


const RoleEditModalForm: FC<Props> = ({role, isLoading}) => {
    const {setItemIdForUpdate} = useRoleListView()
    const {refetch} = useRoleQueryResponse();

    const [roleForEdit] = useState<Role>({
        ...role,


    })

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }


    const formik = useFormik({
        initialValues: roleForEdit,
        validationSchema: roleValidationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    let updateRoleDto: UpdateRoleDto = {
                        value: values.value,
                        description: values.description
                    }
                    await updateRole(role.id, updateRoleDto);
                } else {
                    let createRoleDto: CreateRoleDto = {
                        value:values.value,
                        description:values.description
                    }
                    await createRole(createRoleDto);


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
                    <EditModalInput title={'Value'} fieldName={'value'} formik={formik} isLoading={isLoading}/>
                    <EditModalInput title={'Description'} formik={formik} fieldName={'description'}
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

export {RoleEditModalForm}
