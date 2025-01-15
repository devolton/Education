import {useEffect, useState} from "react";
import SocialMediaItem from "../../../Common/components/SocialMediaItem/SocialMediaItem";
import {useParams} from "react-router-dom";
import SingleEventBody from "../../components/SingleEventBody/SingleEventBody";

export default function SingleEventMainContainer({event, socialLinkCollection, nextPrevEventSlugsPair}) {



        return (<section className="event-details-area section-gap">
            <div className="container">
                <SingleEventBody event={event} socialLinkCollection={socialLinkCollection} nextPrevEventSlugPair={nextPrevEventSlugsPair}/>
            </div>
        </section>)


}