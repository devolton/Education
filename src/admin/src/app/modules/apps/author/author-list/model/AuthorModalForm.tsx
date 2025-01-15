import {FC, useEffect, useMemo, useState} from 'react'
import {useFormik} from 'formik'
import {isNotEmpty, SelectMappingEntity, SocialLinkMappable} from '../../../../../../_metronic/helpers'

import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";

import {EditImageBlock, IImageProps} from "../../../common/components/modal/EditImageBlock.tsx";
import {Config} from "../../../../../../env.config.ts";
import {Author, AuthorPositionEnum, CreateAuthorDto, UpdateAuthorDto} from "../core/_author.model.ts";
import {useAuthorViewList} from "../core/AuthorQueryListViewProvider.tsx";
import {useAuthorResponse} from "../core/AuthorQueryResponseProvider.tsx";
import {authorValidationSchema} from "../common/_author.validation.schema.ts";
import {createAuthor, removeAuthorAvatar, updateAuthor, updateAuthorAvatar} from "../core/_author.request.ts";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";
import {EditModalTextAreaBlock} from "../../../common/components/modal/EditModaTextAreaBlock.tsx";
import {EditModalSelect} from "../../../common/components/modal/EditModalSelect.tsx";


type Props = {
    isLoading: boolean
    author: Author,

}


const AuthorModalForm: FC<Props> = ({author, isLoading}) => {
    const {setItemIdForUpdate} = useAuthorViewList();
    const [selectedAvatarFile, setSelectedAvatarFile] = useState<File>(null);
    const [positionCollection, setPositionCollection] = useState<Array<SelectMappingEntity>>([]);
    const {refetch} = useAuthorResponse();

    const [authorForEdit] = useState<Author>({
        ...author

    })
    const avatarProps: IImageProps = {
        imagePath: author.avatarPath,
        initialPath: Config.PATH.ASSETS.BLOG.AUTHOR.DEFAULT_AVATAR,
        entityId: author.id
    }

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }


    const formik = useFormik({
        initialValues: {
            ...authorForEdit,
            positionIndex: 0

        },
        validationSchema: authorValidationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    let updateAuthorDto: UpdateAuthorDto = {
                        slogan: values.slogan,
                        instagramHref: values.instagramHref,
                        twitterHref: values.twitterHref,
                        facebookHref: values.facebookHref,
                        positionIndex: values.positionIndex,
                        fullName: values.fullName
                    }
                    await updateAuthor(author.id, updateAuthorDto);
                } else {
                    let createAuthorDto:CreateAuthorDto={
                        avatarPath:Config.PATH.ASSETS.BLOG.AUTHOR.DEFAULT_AVATAR,
                        slogan:values.slogan,
                        instagramHref:values.instagramHref,
                        twitterHref:values.twitterHref,
                        facebookHref:values.facebookHref,
                        positionIndex:values.positionIndex,
                        fullName:values.fullName
                    };
                    await createAuthor(createAuthorDto,selectedAvatarFile);

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
        let tempPositions: Array<SelectMappingEntity> = [];
        Object.keys(AuthorPositionEnum).forEach((key, index) => {
            if (isNaN(Number(key))) {
                let positionName = AuthorPositionEnum[key as keyof typeof AuthorPositionEnum];
                if (formik.values.position == positionName) {
                    formik.values.positionIndex = index;
                }
                tempPositions.push({
                    id: index,
                    title: AuthorPositionEnum[key as keyof typeof AuthorPositionEnum]
                });
            }
        });
        let instagramObj: SocialLinkMappable = {
            href: formik.values.instagramHref,
            name: 'instagram',
            backColor: 'danger'
        };
        setPositionCollection(tempPositions);


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
                        <EditImageBlock imageProps={avatarProps}
                                        title={'Avatar'}
                                        removeFunc={removeAuthorAvatar}
                                        updateFunc={updateAuthorAvatar}
                                        setSelectedFile={setSelectedAvatarFile}
                                        refetch={refetch}/>


                    </div>

                    {/* begin::Input group */}
                    <EditModalInput title={'Full name'} fieldName={'fullName'} formik={formik} isLoading={isLoading}/>
                    <EditModalTextAreaBlock title={'Slogan'} formik={formik} fieldName={'slogan'}
                                            isLoading={isLoading}/>
                    {positionCollection.length > 0 &&
                        <EditModalSelect entityCollection={positionCollection} title={'Position'} formik={formik}
                                         fieldName={'positionIndex'} ignoreDefaultOption={true}/>}
                    <EditModalInput title={'Instagram'} fieldName={'instagramHref'} formik={formik}
                                    isLoading={isLoading}/>
                    <EditModalInput title={'Twitter'} fieldName={'twitterHref'} formik={formik} isLoading={isLoading}/>
                    <EditModalInput title={'Facebook'} fieldName={'facebookHref'} formik={formik}
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
            {
                (formik.isSubmitting || isLoading) && <UsersListLoading/>
            }
        </>
    )
}

export {AuthorModalForm}
