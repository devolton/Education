import SmallBannerArea from "../../Common/containers/SmallBannerArea/SmallBannerArea";
import LoginContainer from "../containers/LoginContainer/LoginContainer";
import {useEffect, useState} from "react";
import {MediaService} from "../../../service/media.service";
import Loading from "../../Common/components/Loading/Loading";

export default function LoginPage() {
    const [banner, setBanner] =useState(null);
    useEffect(()=>{
        MediaService.getAuthBanner().then(res=>{
            setBanner(res.data);
        })
    },[])
    if(!banner)
        return <Loading/>

    return (<div>
        <SmallBannerArea currentPageName='Login' imagePath={banner.path}/>
        <LoginContainer/>

    </div>)
}