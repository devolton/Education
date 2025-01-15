import React, {FC} from "react";
import {CustomSelectedButton} from "./CustomSelectedButton.tsx";
import {SelectMappingEntity} from "../../../../../../_metronic/helpers";
import {FormikProps} from "formik";
import {BlogPost} from "../../../post/post-list/core/_post.model.ts";
type Props = {
    entities:Array<SelectMappingEntity>,
    title:string,
    formik:FormikProps<any>,
    fieldName:string
}

const EditModalGridBlock:FC<Props>=({entities,title, formik,fieldName})=>{

    return(
        <div className="mb-10">
            <label className="form-label required fw-bold fs-6 mb-2">{title}</label>
            <div className="row">
                {
                    entities.map((entity:SelectMappingEntity)=>{
                        return(<div key={entity.title+'-'+entity.id} className="col-md-4">
                            <CustomSelectedButton entity={entity} formik={formik} fieldName={fieldName}/>
                        </div>)
                    })
                }

            </div>


        </div>
    )
}
export {EditModalGridBlock}