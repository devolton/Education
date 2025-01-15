import {SocialLinkItem} from "../table/columns/SocialLinkItem.tsx";

import React, {FC} from "react";
import {FormikProps} from "formik";
import {SocialLinkMappable} from "../../../../../../_metronic/helpers";
import clsx from "clsx";

type Props={
    formik:FormikProps<any>,
    fieldName:string,
    socialLinkObj:SocialLinkMappable,
    isLoading:boolean
}

const  EditSocialMediaHref:FC<Props> =({formik, fieldName, socialLinkObj, isLoading})=>{
    const error = formik.touched[fieldName] && formik.errors[fieldName];
    return (
        <div>
            <SocialLinkItem socialLinkObj={socialLinkObj}/>
            <input
                placeholder={String(fieldName)}
                {...formik.getFieldProps(fieldName as string)} // Приведение к строке для `FormikProps`
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    { 'is-invalid': error },
                    { 'is-valid': formik.touched[fieldName] && !formik.errors[fieldName] }
                )}
                type={fieldName === 'email' ? 'email' : 'text'}
                name={String(fieldName)}
                autoComplete='off'
                disabled={formik.isSubmitting || isLoading}
            />
            {/* end::Input */}
            {error && (
                <div className='fv-plugins-message-containe text-danger'>
                    <span role='alert'>{String(formik.errors[fieldName])}</span>
                </div>
            )}
        </div>

    )
}

export {EditSocialMediaHref}