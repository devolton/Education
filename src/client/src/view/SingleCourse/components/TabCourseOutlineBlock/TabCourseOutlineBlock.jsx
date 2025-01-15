import * as React from "react";
import ModalWindow from "../../../Common/components/ModalWindow/ModalWindow";
import LessonItem from "../LessonItem/LessonItem";

export default function TabCourseOutlineBlock({lessonsCollection}){


    return(
        <ul className="course-list">
            {
                lessonsCollection.map((oneLesson)=>{
                    return (<LessonItem lesson={oneLesson}/> )
                })
            }
        </ul>

    )
}