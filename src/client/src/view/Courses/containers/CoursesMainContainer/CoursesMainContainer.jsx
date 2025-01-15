import SingleCourse from "../../components/SingleCourse/SingleCourse";

export default function CoursesMainContainer({coursesCollection, loadMoreCoursesButtonHandler}) {


    return (
        <div className="row">{
            coursesCollection.map((oneCourse)=>{
                return(<SingleCourse key={'course-item-'+oneCourse.id} course={oneCourse}/> )
            })

        }
        <button type={'button'} onClick={loadMoreCoursesButtonHandler} className="primary-btn text-uppercase mx-auto">Load More</button>
        </div>)
}