import {useEffect, useState} from "react";
import {DateConverter} from "../../../../tools/DateConverter";
import {useAuth} from "../../../../contexts/AuthContext";

export default function CourseDetails({course}) {
    const {isAuthenticated} = useAuth();
    const [formattedStartDate, setFormattedStartDate] = useState('11-11-2024');
    const [formattedEndDate, setFormattedEndDate] = useState('11-11-2024');

    useEffect(()=>{
        let startDate= new Date(course.courseSchedule.dateOfStart);
        let endDate= new Date(course.courseSchedule.dateOfEnd);
        setFormattedStartDate(DateConverter.formatDate(startDate));
        setFormattedEndDate(DateConverter.formatDate(endDate));



    },[]);

    return (
        <div className="col-lg-4 right-contents">
            <ul>
                <li className="justify-content-between d-flex text-black">
                    <p>Price</p>
                    <span>${course.price}</span>
                </li>
                <li className="justify-content-between d-flex text-black">
                    <p>Schedule </p>
                    <span>{course.courseSchedule.classStartTime} to {course.courseSchedule.classEndTime}</span>
                </li>
                <li className="justify-content-between d-flex text-black">
                    <p>Date of start </p>
                    <span>{formattedStartDate}</span>
                </li>
                <li className="justify-content-between d-flex text-black">
                    <p>Date of end </p>
                    <span>{formattedEndDate}</span>
                </li>
            </ul>

            <button type='button' disabled={!isAuthenticated} className="primary-btn text-uppercase">Choose course</button>
        </div>
    )
}