import CoursesWrapper from "../../containers/CoursesWrapper/CoursesWrapper";
import SmallBannerArea from "../../../Common/containers/SmallBannerArea/SmallBannerArea";
import {useEffect, useState} from "react";
import Loading from "../../../Common/components/Loading/Loading";
import {MediaService} from "../../../../service/media.service";

export default function CoursesPage() {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        MediaService.getCourseBanner().then(res => {
            setBanner(res.data);
        })

    }, [])
    if (!banner)
        return <Loading/>

    return (
        <>
            <SmallBannerArea currentPageName='Courses' imagePath={banner.path}/>
            <CoursesWrapper/>
        </>

    );
}