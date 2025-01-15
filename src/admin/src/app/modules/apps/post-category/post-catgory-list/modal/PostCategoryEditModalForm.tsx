import {FC, useEffect, useMemo, useState} from 'react'
import {useFormik} from 'formik'
import {ID, isNotEmpty, QUERIES, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'

import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";

import {CreatePostCategoryDto, PostCategory, UpdatePostCategoryDto} from "../core/_post.category.model.ts";
import {usePostCategoryListView} from "../core/PostCategoryListViewProvider.tsx";
import {usePostCategoryQueryResponse} from "../core/PostCategoryQueryResponseProvider.tsx";
import {postCategoryEditSchema} from "../common/_post.category.edit.schema.ts";
import {createCategory, removeThumbnail, updateCategory, updateThumbnailOfCategory} from "../core/_category.request.ts";
import {EditImageBlock, IImageProps} from "../../../common/components/modal/EditImageBlock.tsx";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";


type Props = {
    isLoading: boolean
    postCategory: PostCategory,

}




const PostCategoryEditModalForm: FC<Props> = ({postCategory, isLoading}) => {
    const {setItemIdForUpdate} = usePostCategoryListView();
    const [selectedFile,setSelectedFile]= useState<File>(null);
    const {refetch} = usePostCategoryQueryResponse();

    const [categoryForEdit] = useState<PostCategory>({
        ...postCategory,


    })
    const imageProps:IImageProps={
        imagePath:postCategory.thumbnailPath,
        initialPath:'/static/blog/categories/thumbnails/defaultThumbnail.png',
        entityId:postCategory.id
    }

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }



    const formik = useFormik({
        initialValues: categoryForEdit,
        validationSchema: postCategoryEditSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    let updateCategoryDto:UpdatePostCategoryDto = {
                        name:values.name,
                        description:values.description,
                    }
                    await updateCategory(postCategory.id, updateCategoryDto);
                }
                else{
                    let createCategoryDto:CreatePostCategoryDto={
                        name:values.name,
                        description:values.description,
                        thumbnailPath:values.thumbnailPath
                    }
                    await createCategory(createCategoryDto,selectedFile);

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
                    <EditImageBlock imageProps={imageProps}
                                    refetch={refetch}
                                    updateFunc={updateThumbnailOfCategory}
                                    setSelectedFile={setSelectedFile}
                                    removeFunc={removeThumbnail}/>
                    {/* begin::Input group */}
                    <EditModalInput isLoading={isLoading} title={'Name'} formik={formik} fieldName={'name'}/>
                    <EditModalInput isLoading={isLoading} title={'Description'} formik={formik} fieldName={'description'}/>


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

export {PostCategoryEditModalForm}
