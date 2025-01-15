import {FC} from "react";

type Props={
    title:string;
    value:string;
}
const OverviewItem:FC<Props>=({title,value})=>{

    return (    <div className='row mb-7'>
        <label className='col-lg-4 fw-bold text-muted'>{title}</label>

        <div className='col-lg-8'>
            <span className='fw-bolder fs-6 text-gray-900'>{value}</span>
        </div>
    </div>)

}
export {OverviewItem}