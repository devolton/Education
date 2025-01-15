import SingleReview from "../../components/SingleReview/SingleReview";
import React from "react";
import SingleEvent from "../../../Events/components/SingleEvent/SingleEvent";

export default function DoubleCarouselItemContainer({leftElement, rightElement,key=null}){


    return( <div key={key} className='d-flex justify-content-around'>
            {leftElement}
            {rightElement}
        </div>

    )
}