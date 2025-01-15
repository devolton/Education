
import BlockTitle from "../../../Common/components/BlockTitle/BlockTitle";
import CoursesMainContainer from "../CoursesMainContainer/CoursesMainContainer";
import {useEffect, useState} from "react";
import {CourseService} from "../../../../service/course.service";
import Loading from "../../../Common/components/Loading/Loading";


export default function CoursesWrapper() {
    const INCREMENT_LIMIT_STEP = 4;
    const [courseCollection, setCourseCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    let courseLimit = 4;

    useEffect(() => {
        initCourseCollection();

    }, []);

    function initCourseCollection() {
        CourseService.getCoursesRange(courseLimit)
            .then((res)=>{
                setCourseCollection(res.data);
                setIsLoaded(true);

        }).catch((e)=>{
            console.log(e);
        })
    }
    function loadMoreCourseButtonHandler(e){
        courseLimit+=INCREMENT_LIMIT_STEP;
        initCourseCollection();
    }

    if (!isLoaded) {
        return (<Loading/>)
    } else {

        return (<section className="popular-courses-area section-gap courses-page">
            <div className="container">
                <BlockTitle title='Courses' description='Its courses block wich will be modification'/>
                <CoursesMainContainer coursesCollection={courseCollection} loadMoreCoursesButtonHandler={loadMoreCourseButtonHandler}/>
            </div>
        </section>);
    }
}