import {FC, useEffect, useState} from 'react'
import {useFormik} from 'formik'
import {isNotEmpty, SelectMappingEntity} from '../../../../../../_metronic/helpers'

import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {usePostListView} from "../core/PostListViewProvider.tsx";
import {usePostResponse} from "../core/PostResponseProvider.tsx";
import {EditImageBlock, IImageProps} from "../../../common/components/modal/EditImageBlock.tsx";
import {
    BlogPost,
    CreateBlogPostDto,
    CreateBlogPostInfoDto,
    PostStatusEnum,
    UpdateBlogPostDto,
    UpdateBlogPostInfoDto
} from "../core/_post.model.ts";
import {
    createPost,
    removePostPoster,
    removePostThumbnail,
    updatePost,
    updatePostPoster,
    updatePostThumbnail
} from "../core/_post.request.ts";
import {postValidationSchema} from "../common/post.validation.schema.ts";
import {getAllAuthors} from "../../../author/author-list/core/_author.request.ts";
import {PostEditModalFormRadioItem} from "./PostEditModalFormRadioItem.tsx";
import {EditModalGridBlock} from "../../../common/components/modal/EditModalGridBlock.tsx";
import {getAllCategory} from "../../../post-category/post-catgory-list/core/_category.request.ts";
import {getPostTags} from "../../../post-tag/post-tag-list/core/_post.tag.request.ts";
import {PostTag} from "../../../post-tag/post-tag-list/core/_post.tag.model.ts";
import {EditModalSelect} from "../../../common/components/modal/EditModalSelect.tsx";
import {Config} from "../../../../../../env.config.ts";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";
import {EditModalTextAreaBlock} from "../../../common/components/modal/EditModaTextAreaBlock.tsx";


type Props = {
    isLoading: boolean
    post: BlogPost,

}


const PostEditModalForm: FC<Props> = ({post, isLoading}) => {
    const {setItemIdForUpdate} = usePostListView();
    const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File>(null);
    const [selectedPosterFile, setSelectedPosterFile] = useState<File>(null);
    const [authors, setAuthors] = useState<SelectMappingEntity[]>([]);
    const [statusCollection, setStatusCollection] = useState<PostStatusEnum[]>([]);
    const [categoryCollection, setCategoryCollection] =useState<Array<SelectMappingEntity>>([]);
    const [tagsCollection,setTagsCollection] = useState<Array<SelectMappingEntity>>([])
    const {refetch} = usePostResponse();

    const [postForEdit] = useState<BlogPost>({
        ...post
    })
    const thumbnailProps: IImageProps = {
        imagePath: post.thumbnailPath,
        initialPath: Config.PATH.ASSETS.BLOG.POST.DEFAULT_THUMBNAIL,
        entityId: post.id
    }
    const posterProps: IImageProps = {
        imagePath: post.posterPath,
        initialPath: Config.PATH.ASSETS.BLOG.POST.DEFAULT_POSTER,
        entityId: post.id
    }

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }


    const formik = useFormik({
        initialValues: {
            ...postForEdit,
            tagIds:(post.id ===undefined)?[]:postForEdit.tags.map((tag)=> tag.id),
            categoryIds:(post.id===undefined)?[]:postForEdit.categories.map((category)=>category.id)
        },
        validationSchema: postValidationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    let updatePostDto: UpdateBlogPostDto = {
                        title: values.title,
                        shortDescription: values.shortDescription,
                        content: values.content,
                        imgAlt: values.imgAlt,
                        slug: values.slug,
                        categoriesIds:values.categoryIds,
                        tagsIds:values.tagIds
                    }
                    let updatePostInfoDto:UpdateBlogPostInfoDto={
                        viewCount:values.postInfo.viewsCount,
                        status:values.postInfo.status,
                    }
                    await updatePost(post.id,updatePostDto,updatePostInfoDto);

                } else {
                    let createPostDto: CreateBlogPostDto = {
                        title: values.title,
                        shortDescription: values.shortDescription,
                        thumbnailPath: values.thumbnailPath,
                        posterPath: values.posterPath,
                        content: values.content,
                        authorId: values.authorId,
                        imgAlt: values.imgAlt,
                        slug: values.slug,
                        categoriesIds:values.categoryIds,
                        tagsIds:values.tagIds
                    }
                    let createPostInfoDto:CreateBlogPostInfoDto={
                        viewCount:0,
                        status:PostStatusEnum.CREATED,
                        dateOfCreated:new Date(),
                        dateOfPublished:new Date()
                    }
                    await createPost(createPostDto,createPostInfoDto,selectedPosterFile,selectedThumbnailFile);


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
        getPostTags('').then(res=>{
            let tags = res.data;
            let tempTagsArr:Array<SelectMappingEntity> =[];
            if(tags){
                tags.forEach((tag:PostTag)=>{
                    tempTagsArr.push({
                        id:tag.id,
                        title:tag.name
                    });
                })
                setTagsCollection(tempTagsArr);
            }
        })
        getAllCategory('').then(res=>{
            let categories = res.data;
            let tempCategoriesArr:Array<SelectMappingEntity> = [];
            if(categories){
                categories.forEach((category)=>{
                    tempCategoriesArr.push({
                        title:category.name,
                        id:category.id
                    })
                })
            }
            setCategoryCollection(tempCategoriesArr)

        })

        let statusCollection = Object.values(PostStatusEnum);
        setStatusCollection(statusCollection);
        getAllAuthors('').then((res) => {
            let tempSelectMappingArr: SelectMappingEntity[] = [];
            let authors = res.data;
            authors.forEach((author) => {
                tempSelectMappingArr.push({
                    id: author.id,
                    title: author.fullName
                })
            });
            setAuthors(tempSelectMappingArr);
            return (() => {
                setSelectedPosterFile(null);
                setSelectedThumbnailFile(null);
            })
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
                    <div className='d-flex justify-content-around'>
                        <EditImageBlock imageProps={thumbnailProps}
                                        title={'Thumbnail'}
                                        removeFunc={removePostThumbnail}
                                        updateFunc={updatePostThumbnail}
                                        setSelectedFile={setSelectedThumbnailFile}
                                        refetch={refetch}/>
                        <EditImageBlock imageProps={posterProps}
                                        title={'Poster'}
                                        refetch={refetch}
                                        updateFunc={updatePostPoster}
                                        removeFunc={removePostPoster}
                                        setSelectedFile={setSelectedPosterFile}/>

                    </div>

                    {/* begin::Input group */}
                    <EditModalInput title={'Title'} fieldName={'title'} formik={formik} isLoading={isLoading}/>
                    <EditModalInput title={'Image alt'} fieldName={'imgAlt'} formik={formik}
                                            isLoading={isLoading}/>
                    <EditModalInput title={'Slug'} fieldName={'slug'} formik={formik} isLoading={isLoading}/>
                    <EditModalTextAreaBlock title='Content' formik={formik} fieldName={'content'}
                                                    isLoading={isLoading}/>
                    <EditModalTextAreaBlock title={'Short Description'} formik={formik}
                                                    fieldName={'shortDescription'} isLoading={isLoading}/>
                    {post.id === undefined && authors.length > 0 && <EditModalSelect title={'Authors'}
                                                                                         entityCollection={authors}
                                                                                         formik={formik}
                                                                                         fieldName={'authorId'}/>}
                    {post.id !== undefined && statusCollection.length>0 &&
                        <div className='mb-7'>
                        <label className='required fw-bold fs-6 mb-5'>Status</label>
                            {
                                statusCollection.map((status,index)=>{
                                    return (<PostEditModalFormRadioItem key={`post-status-${status}-${index}`}
                                                                        formik={formik}
                                                                        isLoading={isLoading}
                                                                        value={status}/>)
                                })
                            }
                    </div>
                    }
                    {
                        categoryCollection.length>0 &&  <EditModalGridBlock entities={categoryCollection}
                                                                            title={'Categories'}
                                                                            formik={formik}
                                                                            fieldName={'categoryIds'}/>
                    }
                    {tagsCollection.length>0 && <EditModalGridBlock entities={tagsCollection}
                                                                    title={'Tags'}
                                                                    formik={formik}
                                                                    fieldName={'tagIds'}/>
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

export {PostEditModalForm}
