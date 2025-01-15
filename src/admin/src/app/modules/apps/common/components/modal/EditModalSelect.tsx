import {ID, SelectMappingEntity} from "../../../../../../_metronic/helpers";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {FormikProps} from "formik";

type Props={
    entityCollection:Array<SelectMappingEntity>,
    title:string,
    formik:FormikProps<any>,
    fieldName:string,
    ignoreDefaultOption?:boolean

}
const EditModalSelect:FC<Props>=({entityCollection,title,formik,fieldName,ignoreDefaultOption=false})=>{
    const [value,setValue] = useState<number>(0);


    const onChangeHandler =(e:ChangeEvent<HTMLSelectElement>)=>{
        let val=parseInt(e.target.value);
        setValue(val);
        formik.values[fieldName]=val;
    }

    useEffect(()=>{
        if(entityCollection.length==0){
            formik.values[fieldName]=entityCollection[0].id;
        }
        setValue(formik.values[fieldName]);
    },[])

    return (
        <div className="mb-5">
            <label htmlFor="exampleSelect" className="form-label">{title}</label>
            <select className="form-select cursor-pointer" value={value} id="exampleSelect"  onChange={(e=>onChangeHandler(e))}>
                {(!ignoreDefaultOption) && <option key={'option-nav-default'} className={'cursor-pointer'} value={null}>-</option>}
                {
                    entityCollection!==null &&  entityCollection.map((item:SelectMappingEntity)=>{
                        return (<option key={`option-${item.title}-${item.id}`}
                                        className={'cursor-pointer'}
                                        value={item.id}>{item.title}</option>)
                    })
                }
            </select>
        </div>

    )
}
export {EditModalSelect}