
import {Link} from "react-router-dom";
import {toDevoltonLabsUrl} from '../../../../tools/helpers'

export default function SingleCourse({course}){

    return( <div className="single-popular-carusel col-lg-3 col-md-6">
        <div className="thumb-wrap relative">
            <div className="thumb relative">
                <div className="overlay overlay-bg"></div>
                <img className="img-fluid" src={toDevoltonLabsUrl(course.thumbnailPath)} alt={course.title}/>
            </div>
            <div className="meta d-flex justify-content-between">
                <h4>${course.price}</h4>
            </div>
        </div>
        <div className="details">
            <Link to={`/courses/${course.slug}`}>
                <h4>
                    {course.title}
                </h4>
            </Link>
            <p>
                {course.shortDescription}
            </p>
        </div>
    </div>)
}