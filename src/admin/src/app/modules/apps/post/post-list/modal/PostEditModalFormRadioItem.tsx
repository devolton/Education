import {FormikProps} from "formik";
import {BlogPost, PostStatusEnum} from "../core/_post.model.ts";
import {FC} from "react";

type Props={
    formik:FormikProps<BlogPost>,
    isLoading:boolean,
    value:PostStatusEnum
}
const PostEditModalFormRadioItem:FC<Props> = ({formik, isLoading,value}) => {

    return (

        <div>
            <div className='d-flex fv-row'>
                {/* begin::Radio */}
                <div className='form-check form-check-custom form-check-solid'>
                    {/* begin::Input */}
                    <input
                        className='form-check-input me-3 cursor-pointer'
                        {...formik.getFieldProps('postInfo.status')}
                        name='post-status'
                        type='radio'
                        value={value}
                        id='kt_modal_update_post_option_0'
                        onChange={() => formik.setFieldValue('postInfo.status', value)}
                        checked={formik.values.postInfo?.status === value}
                        disabled={formik.isSubmitting || isLoading}
                    />

                    {/* end::Input */}
                    {/* begin::Label */}
                    <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                        <div className='fw-bolder text-gray-800'>{value}</div>
                    </label>
                    {/* end::Label */}
                </div>
                {/* end::Radio */}
            </div>
            <div className='separator separator-dashed my-5'></div>
        </div>
    )
}

export {PostEditModalFormRadioItem}