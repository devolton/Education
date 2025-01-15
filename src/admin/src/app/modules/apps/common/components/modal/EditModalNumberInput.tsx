import {FormikProps} from "formik";
import {FC} from "react";
import clsx from "clsx";

type Props={
    title:string,
    minValue:number,
    maxValue:number,
    formik:FormikProps<any>,
    fieldName:string,
    isLoading:boolean
}
const EditModalNumberInput:FC<Props> =({title,minValue,maxValue,formik,fieldName,isLoading})=>{


    return (<div data-mdb-input-init className="fv-row mb-7 form-outline">
        <label className="form-label">{title}</label>
        <input
            {...formik.getFieldProps(fieldName as string)}
            className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched[fieldName] && formik.errors[fieldName]},
                {
                    'is-valid': formik.touched[fieldName] && !formik.errors[fieldName],
                }
            )}

             placeholder={`Input ${title}...`}
            disabled={formik.isSubmitting || isLoading}
            min={minValue}
            max={maxValue}
            type="number"

         />
    </div>)
}
export {EditModalNumberInput}