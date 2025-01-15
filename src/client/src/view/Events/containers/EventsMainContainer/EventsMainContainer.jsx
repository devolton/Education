
import BlockTitle from "../../../Common/components/BlockTitle/BlockTitle";
import {useEffect, useState} from "react";
import EventsContainer from "../EventsContainer/EventsContainer";
import {EventService} from "../../../../service/event.service";
import Loading from "../../../Common/components/Loading/Loading";


export default function EventsMainContainer() {
    const LIMIT_STEP = 2;
    const [limit,setLimit] =useState(2);
    const [eventsCollection, setEventsCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        getEvents();
        setLimit(limit+LIMIT_STEP);
    }, []);
    function onClickHandler(e){
        getEvents();
        setLimit(limit+LIMIT_STEP);
    }
    function getEvents(){
        EventService.getEventsRange(limit)
            .then(res => {
                setEventsCollection(res.data);
                setIsLoaded(true);

            }).catch(err => {
            console.log(err);
        })
    }
    if (!isLoaded) {
        return <Loading/>
    }
    else {
        return (
            <section className="events-list-area section-gap event-page-lists">
                <div className="container">
                    <BlockTitle title='Events' description='Its events block wich will be modification'/>
                    <EventsContainer eventsCollection={eventsCollection} onClickHandler={onClickHandler}/>
                </div>
            </section>
        )
    }
}