import CarouselSlider from "../../components/CarouselSlider/CarouselSlider";
import DoubleCarouselItemContainer from "../DoubleCarouselItemContainer/DoubleCarouselItemContainer";
import SingleEvent from "../../../Events/components/SingleEvent/SingleEvent";
import React, {useEffect, useState} from "react";

export default function CarouselSliderEventsContainer({eventsCollection}) {
    const [doubleCarouselItemCollection, setDoubleCarouselItemContainer] = useState([]);

    useEffect(() => {
        let tempArray = [];
        for (let i = 0; i < eventsCollection.length - 1; i += 2) {
            tempArray.push(<DoubleCarouselItemContainer   leftElement={<SingleEvent oneEvent={eventsCollection[i]}/>}
                                                        rightElement={<SingleEvent oneEvent={eventsCollection[i + 1]}/>}
            key={'double-carousel-event-'+i}/>)
        }
        setDoubleCarouselItemContainer(tempArray);


    }, [])


    return (
        <div className="w-100">
            <CarouselSlider collection={doubleCarouselItemCollection}/>
        </div>
    )
}