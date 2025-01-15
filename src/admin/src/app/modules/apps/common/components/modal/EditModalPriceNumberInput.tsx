import {FormikProps} from "formik";
import {FC} from "react";
import clsx from "clsx";


type Props={
    title:string,
    minPrice:number,
    maxPrice:number,
    formik:FormikProps<any>,
    fieldName:string,
    isLoading:boolean

}
const EditModalPriceNumberInput:FC<Props> =({title,minPrice,maxPrice,formik,fieldName,isLoading})=>{


    return (<div data-mdb-input-init className="fv-row mb-7 form-outline" >
        <label className="form-label" htmlFor="form2">{title}</label>
        <input  value="$"
                type="text"
                {...formik.getFieldProps(fieldName as string)}
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched[fieldName] && formik.errors[fieldName]},
                    {
                        'is-valid': formik.touched[fieldName] && !formik.errors[fieldName],
                    }
                )}

                placeholder={`Input ${title}...`}
                disabled={formik.isSubmitting || isLoading}/>

    </div>)
}

export {EditModalPriceNumberInput}