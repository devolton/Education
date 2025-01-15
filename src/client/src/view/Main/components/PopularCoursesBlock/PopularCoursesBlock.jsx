import SingleCourse from "../../../Courses/components/SingleCourse/SingleCourse";
import React from "react";

export default function PopularCoursesBlock({coursesCollection}) {


    return (
        <div className="row">
            {
                coursesCollection.map((oneCourse)=>{
                    return<SingleCourse key={'pop-course-'+oneCourse.id} course={oneCourse}/>

                })
            }

        </div>)
}