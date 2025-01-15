import FeatureWrapper from "../../containers/FeatureWrapper/FeatureWrapper";
import PopularCourseContainer from "../../containers/PopularCourseContainer/PopularCourseContainer";
import ReviewContainer from "../../containers/ReviewContainer/ReviewContainer";
import UpcomingEventsContainer from "../../containers/UpcomingEventsContainer/UpcomingEventsContainer";
import CtaOneArea from "../../../Common/containers/CtaOneArea/CtaOneArea";
import BlogContainer from "../../containers/BlogContainer/BlogContainer";
import BannerArea from "../../containers/BannerArea/BannerArea";
import CtaTwoArea from "../../../Common/containers/CtaTwoArea/CtaTwoArea";


export default function MainPage(){


    return (
        <div>
            <BannerArea/>
            <FeatureWrapper/>
            <PopularCourseContainer/>
            <CtaOneArea/>
            <UpcomingEventsContainer/>
            <ReviewContainer/>
            <CtaTwoArea/>
            <BlogContainer/>

        </div>

    );
}