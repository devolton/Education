
import SingleCourseMainContainer from "../containers/SingleCourseMainContainer/SingleCourseMainContainer";
import SmallBannerArea from "../../Common/containers/SmallBannerArea/SmallBannerArea";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CourseService} from "../../../service/course.service";


export default function SingleCoursePage() {
    const {slug} = useParams();
    const [course, setCourse] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        initCourse()
    }, []);
    function initCourse() {
        CourseService.getCourseBySlug(slug)
            .then((res) => {
                setCourse(res.data);
                setIsLoaded(true);
            }).catch(err => {
            console.log(err);
        })
    }

    if (!isLoaded) {
        return (<h1>Loading... </h1>)
    } else {

        return (
            <div>
                <SmallBannerArea currentPageName={course.title} imagePath={course.posterPath}/>
                <SingleCourseMainContainer course={course}/>
            </div>

        )
    }
}