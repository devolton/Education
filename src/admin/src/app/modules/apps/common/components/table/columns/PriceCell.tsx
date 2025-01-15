import {useEffect} from "react";

type Props={
    price:number
}
const PriceCell=({price})=>{

    return (
        <div className="d-flex align-items-center me-2">
            <div className="symbol symbol-50px me-3">
                <div className="symbol-label bg-light-success"><i
                    className="ki-duotone ki-dollar fs-1 text-success"><span className="path1"></span><span
                    className="path2"></span><span className="path3"></span><span className="path4"></span></i></div>
            </div>
            <div>
                <div className="fs-4 text-gray-900 fw-bold">$ {price}</div>

            </div>
        </div>
    )
}
export {PriceCell}