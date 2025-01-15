import SmallBannerArea from "../../Common/containers/SmallBannerArea/SmallBannerArea";
import SingInContainer from "../containers/SingInContainer/SingInContainer";
import {useEffect, useState} from "react";
import Loading from "../../Common/components/Loading/Loading";
import {MediaService} from "../../../service/media.service";


export default function SingInPage() {
    const [banner, setBanner] = useState(null);
    useEffect(() => {
        MediaService.getAuthBanner().then(res=>{
            setBanner(res.data);
        })
    }, [])
    if (!banner)
        return <Loading/>

    return (<div>
        <SmallBannerArea currentPageName='Sing in' imagePath={banner.path}/>
        <SingInContainer/>

    </div>)
}