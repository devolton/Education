
import SmallBannerArea from "../../Common/containers/SmallBannerArea/SmallBannerArea";
import SingleEventMainContainer from "../containers/SingleEventMainContainer/SingleEventMainContainer";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {EventService} from "../../../service/event.service";
import {OptionService} from "../../../service/option.service";
import Loading from "../../Common/components/Loading/Loading";
export default function SingleEventPage(){
    let {slug} = useParams();
    const [event, setEvent] = useState(null);
    const [nextPrevEventsPair, setNextPrevEventsPair] = useState([]);
    const [socialLinkCollection, setSocialLinkCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        initSocialLinks();
        initPrevNextEventPair();
        initEvent();

    }, [slug]);
    function initPrevNextEventPair(){
        EventService.getNeighbourEvents(slug)
            .then((res) => {
                setNextPrevEventsPair(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }

    function initEvent() {
        EventService.getEventBySlug(slug)
            .then((res) => {
                setEvent(res.data);
                setIsLoaded(true);

            })
            .catch(err => {
                console.log(err);
            })
    }

    function initSocialLinks() {
        OptionService.getSocialLinkOptions()
            .then(res => {
                setSocialLinkCollection(res.data);
            }).catch(err => {
            console.log(err);
        })
    }
    if (!isLoaded) {
        return (<Loading/>)
    } else {

        return (
            <>
                <SmallBannerArea currentPageName={event.title} imagePath={event.posterPath}/>
                <SingleEventMainContainer event={event} socialLinkCollection={socialLinkCollection} nextPrevEventSlugsPair={nextPrevEventsPair}/>
            </>
        )
    }
}