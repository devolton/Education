import {FC, useEffect, useRef, useState} from "react";
import {SelectMappingEntity} from "../../../../../../_metronic/helpers";
import {FormikProps} from "formik";
import {BlogPost} from "../../../post/post-list/core/_post.model.ts";

type Props = {
    entity:SelectMappingEntity,
    formik?:FormikProps<any>,
    fieldName?:string
}
const CustomSelectedButton:FC<Props>=({entity, formik, fieldName})=>{
    const [itemId,setItemId]=useState<number>(undefined);

    const [isSelected, setIsSelected]= useState<boolean>(false)
    useEffect(()=>{
        if(formik.values[fieldName].includes(entity.id)){
            setIsSelected(true);
        }
        setItemId(entity.id);

    },[])

    const clickHandler=(e)=>{
        if(isSelected){
            formik.values[fieldName]=formik.values[fieldName].filter(id=>id!=itemId)
        }
        else{
            formik.values[fieldName].push(itemId);
        }

        setIsSelected(!isSelected);

    }
    return (
        <button type="button"
                className={`m-2 btn ${(isSelected)?'btn-success':'btn-outline-secondary'}`}
                onClick={clickHandler}
        >{entity.title}</button>
    )
}
export {CustomSelectedButton}