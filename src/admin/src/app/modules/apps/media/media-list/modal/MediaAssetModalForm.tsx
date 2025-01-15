import {FC, useEffect, useMemo, useState} from 'react'
import {useFormik} from 'formik'
import {isNotEmpty, SelectMappingEntity} from '../../../../../../_metronic/helpers'

import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";

import {EditImageBlock, IImageProps} from "../../../common/components/modal/EditImageBlock.tsx";
import {Config} from "../../../../../../env.config.ts";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";
import {useMediaAssetListView} from "../core/MediaAssetListViewProvider.tsx";
import {useMediaAssetResponse} from "../core/MediaAssetQueryResponseProvider.tsx";
import {MediaAsset, UpdateMediaAssetDto} from "../core/_media.asset.model.ts";
import {mediaAssetValidationSchema} from "../common/_media.asset.validation.schema.ts";
import {removeMediaAssetImage, updateMediaAsset, updateMediaAssetImage} from "../core/_media.asset.request.ts";


type Props = {
    isLoading: boolean
    mediaAsset: MediaAsset,

}


const MediaAssetForm: FC<Props> = ({mediaAsset, isLoading}) => {
    const {setItemIdForUpdate} = useMediaAssetListView();
    const [selectedImage, setSelectedImage] = useState<File>(null);
    const {refetch} = useMediaAssetResponse();

    const [mediaAssetForUpdate] = useState<MediaAsset>({
        ...mediaAsset

    })
    const imageProps: IImageProps = {
        imagePath: mediaAsset.path,
        initialPath: Config.PATH.ASSETS.MEDIA_ASSET.DEFAULT_MEDIA_ASSET,
        entityId: mediaAsset.id
    }

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }


    const formik = useFormik({
        initialValues: {
            id:mediaAssetForUpdate.id,
            alt: mediaAssetForUpdate.alt,
            path: mediaAssetForUpdate.path

        },
        validationSchema: mediaAssetValidationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    let updateMediaDto: UpdateMediaAssetDto = {
                        alt: values.alt
                    }
                    await updateMediaAsset(values.id, updateMediaDto);


                } else {


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
                        <EditImageBlock imageProps={imageProps}
                                        title={'Image'}
                                        removeFunc={removeMediaAssetImage}
                                        updateFunc={updateMediaAssetImage}
                                        setSelectedFile={setSelectedImage}
                                        refetch={refetch}
                                        height={250}
                                        width={400}/>

                    </div>

                    {/* begin::Input group */}
                    <EditModalInput title={'Alt'} fieldName={'alt'} formik={formik} isLoading={isLoading}/>

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

export {MediaAssetForm}
