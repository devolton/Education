import SmallBannerArea from "../../../Common/containers/SmallBannerArea/SmallBannerArea";
import EventsMainContainer from "../../containers/EventsMainContainer/EventsMainContainer";
import CtaTwoArea from "../../../Common/containers/CtaTwoArea/CtaTwoArea";
import {useEffect, useState} from "react";
import {MediaService} from "../../../../service/media.service";
import Loading from "../../../Common/components/Loading/Loading";

export default function EventsPage(){
    const [banner,setBanner] = useState(null);

    useEffect(()=>{
        MediaService.getEventBanner().then(res=>{
            setBanner(res.data);
        })

    },[])
    if(!banner)
        return <Loading/>

    return (
        <>
            <SmallBannerArea currentPageName='Events' imagePath={banner.path}/>
            <EventsMainContainer/>
            <CtaTwoArea/>
        </>
    );
}