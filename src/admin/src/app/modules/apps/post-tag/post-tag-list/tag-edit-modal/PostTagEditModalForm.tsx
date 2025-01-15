import {FC, useEffect, useMemo, useState} from 'react'
import {useFormik} from 'formik'
import {ID, isNotEmpty, QUERIES, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'

import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {CreatePostTagDto, PostTag, UpdatePostTagDto} from "../core/_post.tag.model.ts";
import {usePostTagListView} from "../core/PostTagListViewProvider.tsx";
import {usePostTagQueryResponse} from "../core/PostTagResponseProvider.tsx";
import {postTagEditSchema} from "../common/_post.tag.edit.schema.ts";
import {createPostTag, updatePostTag} from "../core/_post.tag.request.ts";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";


type Props = {
    isLoading: boolean
    postTag: PostTag,

}




const PostTagEditModalForm: FC<Props> = ({postTag, isLoading}) => {
    const {setItemIdForUpdate} = usePostTagListView()
    const {refetch} = usePostTagQueryResponse();

    const [optionForEdit] = useState<PostTag>({
        ...postTag,


    })

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }



    const formik = useFormik({
        initialValues: optionForEdit,
        validationSchema: postTagEditSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    let updatePostTagDto:UpdatePostTagDto={
                        name:values.name
                    }
                    await updatePostTag(postTag.id,updatePostTagDto);

                }
                else {
                    let createTagDto:CreatePostTagDto={
                        name:values.name
                    }
                    await createPostTag(createTagDto);

                }
                refetch()
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
                    <EditModalInput isLoading={isLoading} title={'Name'} formik={formik} fieldName={'name'}/>


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

export {PostTagEditModalForm}
