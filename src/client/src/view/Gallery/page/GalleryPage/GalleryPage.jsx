import SmallBannerArea from "../../../Common/containers/SmallBannerArea/SmallBannerArea";
import Gallery from "../../containers/Gallery/Gallery";
import CtaTwoArea from "../../../Common/containers/CtaTwoArea/CtaTwoArea";
import {useEffect, useState} from "react";
import {MediaService} from "../../../../service/media.service";
import Loading from "../../../Common/components/Loading/Loading";

export default function GalleryPage(){
    const [banner,setBanner] = useState(null);
    useEffect(()=>{
        MediaService.getGalleryBanner().then(res=>{
            setBanner(res.data);
        })
    },[])
    if(!banner)
        return <Loading/>

    return (
        <>
            <SmallBannerArea currentPageName='Gallery' imagePath={banner.path}/>
            <Gallery/>
            <CtaTwoArea/>
        </>
    );
}