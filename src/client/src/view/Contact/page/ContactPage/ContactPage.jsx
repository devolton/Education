import ContactBody from "../../containers/ContactBody/ContactBody";
import SmallBannerArea from "../../../Common/containers/SmallBannerArea/SmallBannerArea";
import {useEffect, useState} from "react";
import Loading from "../../../Common/components/Loading/Loading";
import {MediaService} from "../../../../service/media.service";

export default function ContactPage(){
    const [banner,setBanner] = useState(null);

    useEffect(()=>{
        MediaService.getContactUsBanner().then(res=>{
            setBanner(res.data);
        })
    },[])

    if(!banner)
        return <Loading/>

    return (
        <>
            <SmallBannerArea currentPageName='Contact Us' imagePath={banner.path}/>
            <ContactBody/>
        </>
    )
}