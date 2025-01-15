import SmallBannerArea from "../../../Common/containers/SmallBannerArea/SmallBannerArea";
import AboutInfoArea from "../../containers/AboutInfoArea/AboutInfoArea";
import ReviewContainer from "../../../Main/containers/ReviewContainer/ReviewContainer";
import CtaTwoArea from "../../../Common/containers/CtaTwoArea/CtaTwoArea";
import {useEffect, useState} from "react";
import {MediaService} from "../../../../service/media.service";
import Loading from "../../../Common/components/Loading/Loading";

export default function AboutPage() {
    const [bannerObj, setBannerObj] = useState(null);
    useEffect(() => {
        MediaService.getAboutBanner().then(res => {
            setBannerObj(res.data);
        })

    }, [])
    if (!bannerObj) {
     return <Loading/>
    }

    return (
        <>
            <SmallBannerArea currentPageName='About' imagePath={bannerObj.path}/>
            <AboutInfoArea/>
            <ReviewContainer/>
            <CtaTwoArea/>

        </>
    );
}