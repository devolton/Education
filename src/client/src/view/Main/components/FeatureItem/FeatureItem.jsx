import {Link} from "react-router-dom";

export default function FeatureItem({oneFeature}) {

    return (
        <div className="col-lg-4">
            <div className="single-feature">
                <div className="title">
                    <h4>{oneFeature.title}</h4>
                </div>
                <div className="desc-wrap">
                    <p>
                        {oneFeature.description}
                    </p>
                    <Link to={oneFeature.href}>{oneFeature.linkTitle}</Link>
                </div>
            </div>
        </div>)
}