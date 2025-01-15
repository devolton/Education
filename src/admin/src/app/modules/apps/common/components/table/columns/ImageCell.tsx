import {toDevoltonAbsoluteUrl} from "../../../../../../../_metronic/helpers";
import {FC} from "react";

type Props={
    path:string,
    alt:string
}
const ImageCell:FC<Props> =({path,alt})=>{

    return (
        <div className="bg-dark text-center rounded h-auto max-h-100px mb-5 shadow" style={{width:'200px', overflow: 'hidden' }}>
            <img
                className="w-100 h-100"
                src={toDevoltonAbsoluteUrl(path)}
                alt={path}
                style={{ objectFit: 'cover' }}
            />
            <span className='fw-light bg-light-subtle text-dark rounded-top fw-bolder p-1'>{alt}</span>
        </div>
    )
}

export {ImageCell}