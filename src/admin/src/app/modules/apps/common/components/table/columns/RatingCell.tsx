
//<Rating name="read-only" size={"small"} value={parseFloat(oneReview.rating)} precision={0.1} readOnly />

import {Rating} from "@mui/material";
import {FC} from "react";

type Props = {
    rating:number,
    review?:string
}

const RatingCell:FC<Props>=({rating,review})=>{

    return ( <div className='d-flex flex-column'>
        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            <Rating name="read-only" size={"small"} value={rating} precision={0.1} readOnly />
        </a>
        { review && <span>{review}</span>}
    </div>)

}
export {RatingCell}