import React, {useEffect, useState} from "react";
import DoubleCarouselItemContainer from "../DoubleCarouselItemContainer/DoubleCarouselItemContainer";
import CarouselSlider from "../../components/CarouselSlider/CarouselSlider";
import SingleReview from "../../components/SingleReview/SingleReview";

export default function CarouselSliderReviewsContainer({reviewCollection}){

    const [doubleCarouselItemCollection, setDoubleCarouselItemContainer] = useState([]);

    useEffect(() => {
        let tempArray = [];
        for (let i = 0; i < reviewCollection.length - 1; i += 2) {
            tempArray.push(<DoubleCarouselItemContainer leftElement={<SingleReview oneReview={reviewCollection[i]}/>}
                                                        rightElement={<SingleReview oneReview={reviewCollection[i + 1]}/>}/>)
        }
        setDoubleCarouselItemContainer(tempArray);


    }, [])


    return (
        <div className="w-100">
            <CarouselSlider collection={doubleCarouselItemCollection}/>
        </div>
    )
}