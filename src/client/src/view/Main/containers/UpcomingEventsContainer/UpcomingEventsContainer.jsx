import SingleEvent from "../../../Events/components/SingleEvent/SingleEvent";
import CarouselSlider from "../../components/CarouselSlider/CarouselSlider";
import DoubleCarouselItemContainer from "../DoubleCarouselItemContainer/DoubleCarouselItemContainer";
import React, {useEffect, useState} from "react";
import CarouselSliderEventsContainer from "../CarouselSliderEventsContainer/CarouselSliderEventsContainer";
import {EventService} from "../../../../service/event.service";


export default function UpcomingEventsContainer() {
    const EVENTS_LIMIT=4
    const [eventsCollection, setEventsCollection] = useState([]);
    const [isLoaded , setIsLoaded] = useState(false);

    useEffect(() => {
        EventService.getRandomEventsRange(EVENTS_LIMIT)
            .then(res=> {
                setEventsCollection(res.data);
                setIsLoaded(true);
            }).catch(err=> {
                console.log(err);
        })
    }, []);
    if(!isLoaded){
        return (<h1>Is loading...</h1>)
    }
    else {

        return (
            <section className="upcoming-event-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-70 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">Upcoming Events of our Institute</h1>
                                <p>If you are a serious astronomy fanatic like a lot of us</p>
                            </div>
                        </div>
                    </div>

                    <CarouselSliderEventsContainer eventsCollection={eventsCollection}/>
                </div>
            </section>
        );
    }
}