import React, {useEffect, useRef, useState} from 'react';
import PopularCoursesBlock from "../../components/PopularCoursesBlock/PopularCoursesBlock";
import {CourseService} from "../../../../service/course.service";


export default function PopularCourseContainer() {
    const COURSE_LIMIT = 4;
    const [popularCoursesCollection, setPopularCoursesCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        initPopularCoursesCollection();


    }, [])

    function initPopularCoursesCollection() {
        CourseService.getRandomCoursesRange(COURSE_LIMIT)
            .then((res) => {
                setPopularCoursesCollection(res.data);
                setIsLoaded(true);

            }).catch(e => {
            console.log(e);
        })

    }

    if (!isLoaded) {
        return (<h1>Loading...</h1>);
    } else {

        return (
            <selection className="popular-course-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-70 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">Popular Courses we offer</h1>
                                <p>There is a moment in the life of any aspiring.</p>
                            </div>
                        </div>
                    </div>
                    <PopularCoursesBlock coursesCollection={popularCoursesCollection}/>
                </div>
            </selection>)
    }
}
