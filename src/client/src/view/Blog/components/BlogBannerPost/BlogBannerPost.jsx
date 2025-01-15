import {Link} from "react-router-dom";
import {useEffect} from "react";
export default function BlogBannerPost({post}) {
    return (<div className="row d-flex align-items-center justify-content-center">
        <div className="about-content blog-header-content col-lg-12">
            <h1 className="text-white">
                {post.title}
            </h1>
            <p className="text-white">
                {post.shortDescription}
            </p>
            <Link to={`/blog/${post.slug}`} className="primary-btn">View More</Link>
        </div>
    </div>)
}