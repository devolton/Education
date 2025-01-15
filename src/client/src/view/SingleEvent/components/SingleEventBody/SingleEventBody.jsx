import Config from '../../../../config';
import SocialMediaItem from "../../../Common/components/SocialMediaItem/SocialMediaItem";
import {useEffect, useState} from "react";
import {DateConverter} from "../../../../tools/DateConverter";
import EventNavigation from "../EventNavigation/EventNavigation";

export default function SingleEventBody({event, socialLinkCollection,nextPrevEventSlugPair}) {
    const [formattedStartDate, setFormattedStartDate] = useState(null);
    const [formattedEndDate, setFormattedEndDate] = useState(null);
    useEffect(()=>{
        let startDate = new Date(event.eventVenue.startDate);
        let endDate = new Date(event.eventVenue.endDate);
        setFormattedStartDate(DateConverter.formatDate(startDate));
        setFormattedEndDate(DateConverter.formatDate(endDate));

    })

    return (<div className="row">
        <div className="col-lg-8 event-details-left">
            <div className="main-img">
                <img className="img-fluid" src={Config.SERVER.URL + event.posterPath} alt="eventDetail"/>
            </div>
            <div className="details-content">
                <h4>{event.title}</h4>
                <p>
                    {event.fullDescription}
                </p>
            </div>
            <div className="social-nav row no-gutters">
                <div className="col-lg-6 col-md-6 ">
                    <ul className="focials">
                        {
                            socialLinkCollection.map(socialLink => {
                                return (<li><SocialMediaItem href={socialLink.value} socialMediaName={socialLink.name}/>
                                </li>)
                            })
                        }

                    </ul>
                </div>
                <EventNavigation nextPrevEventNavPair={nextPrevEventSlugPair}/>
            </div>
        </div>
        <div className="col-lg-4 event-details-right">
            <div className="single-event-details">
                <h4>Details</h4>
                <ul className="mt-10">
                    <li className="justify-content-between d-flex">
                        <span>Company</span>
                        <span>{event.eventDetail.company}</span>
                    </li>

                    <li className="justify-content-between d-flex">
                        <span>Ticket Price</span>
                        <span> {event.eventDetail.ticketPrice} $</span>
                    </li>
                    <li className="justify-content-between d-flex">
                        <span>Number of place</span>
                        <span>{event.eventDetail.numberOfPlaces}</span>
                    </li>
                    <li className="justify-content-between d-flex">
                        <span>Free</span>
                        <span>{event.eventDetail.freePlaces}</span>
                    </li>
                </ul>
            </div>
            <div className="single-event-details">
                <h4>Venue</h4>
                <ul className="mt-10">
                    <li className="justify-content-between d-flex">
                        <span>Street</span>
                        <span>{event.eventVenue.street}</span>
                    </li>
                    <li className="justify-content-between d-flex">
                        <span>City</span>
                        <span>{event.eventVenue.city}</span>
                    </li>
                    <li className="justify-content-between d-flex">
                        <span>Start date</span>
                        <span>{formattedStartDate}</span>
                    </li>
                    <li className="justify-content-between d-flex">
                        <span>End date</span>
                        <span>{formattedEndDate}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>)
}