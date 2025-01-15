
import {Link} from "react-router-dom";
import Config from '../../../../config'
import {useState, useEffect} from "react";
import {DateConverter} from "../../../../tools/DateConverter";

export default function PostCard({post}){
    const [formattedDate, setFormatterDate] = useState('11-11-2024');
    useEffect(()=>{
        let date = new Date(post.postInfo.dateOfPublished);
        setFormatterDate(DateConverter.formatDate(date));

    },[]);

    return(
        <div className="col-lg-3 col-md-6 single-blog">
            <div className="thumb">
                <img className="img-fluid" src={Config.SERVER.URL+post.thumbnailPath} alt={post.imgAlt}/>
            </div>
            <p className="meta">{formattedDate} | By <a href="#">{post.author.fullName}</a></p>
            <Link  to={`/blog/${post.slug}`}>
                <h5>{post.title}</h5>
            </Link>
            <p>
                {post.shortDescription}
            </p>
            <Link to={`/blog/${post.slug}`} className="details-btn d-flex justify-content-center align-items-center"><span
                className="details">Details</span><span className="lnr lnr-arrow-right"></span></Link>
        </div>
    );
}