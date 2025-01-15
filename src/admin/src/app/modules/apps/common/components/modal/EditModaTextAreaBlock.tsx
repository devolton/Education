
import React, {FC} from "react";
import clsx from "clsx";
import {FormikProps} from "formik";

type Props={
    title:string,
    formik:FormikProps<any>,
    fieldName:string,
    isLoading:boolean
}
const EditModalTextAreaBlock:FC<Props>=({title,formik,fieldName,isLoading})=>{

    return (
        <div className="mb-10">
            <label className="form-label required fw-bold fs-6 mb-2">{title}</label>
            <textarea
                {...formik.getFieldProps(fieldName as string)}
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched[fieldName] && formik.errors[fieldName]},
                    {
                        'is-valid': formik.touched[fieldName] && !formik.errors[fieldName],
                    }
                )}
                rows={7}
                placeholder={`Input ${title}...`}
                disabled={formik.isSubmitting || isLoading}
            ></textarea>
            {formik.touched[fieldName] && formik.errors[fieldName] && (
                <div className='fv-plugins-message-container'>
                    <span role='alert'>{String(formik.errors[fieldName])}</span>
                </div>
            )}
        </div>

    )
}
export {EditModalTextAreaBlock}