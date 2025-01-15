import Config from '../../../../config';
import CourseTabPanel from "../../components/CourseTabPanel/CourseTabPanel";
import CourseDetails from "../../components/CourseDetails/CourseDetails";

export default function SingleCourseMainContainer({course}) {


        return (<section className="course-details-area pt-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 left-contents">
                        <div className="main-image mb-4">
                            <img className="img-fluid" src={Config.SERVER.URL+course.posterPath} alt={course.title}/>
                        </div>
                        <CourseTabPanel course={course}/>
                    </div>
                    <CourseDetails course={course}/>
                </div>
            </div>
        </section>)
}