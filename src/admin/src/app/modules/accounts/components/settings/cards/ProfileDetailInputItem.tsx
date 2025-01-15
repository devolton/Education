import {FC} from "react";
import {FormikProps} from "formik";
import {IProfileDetails} from "../SettingsModel.ts";

type Props={
    title:string;
    formik:FormikProps<IProfileDetails>;
    field:string;

}


const ProfileDetailInputItem:FC<Props>=({title,formik,field})=>{
    return (  <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>{title}</label>

        <div className='col-lg-8 fv-row'>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                placeholder={title}
                {...formik.getFieldProps(field)}
            />
            {formik.touched[field] && formik.errors[field] && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors[field]}</div>
                </div>
            )}
        </div>
    </div>)

}
export {ProfileDetailInputItem}