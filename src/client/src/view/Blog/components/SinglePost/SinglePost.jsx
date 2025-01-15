
import {useEffect, useState} from "react";
import {DateConverter} from "../../../../tools/DateConverter";
import Config from '../../../../config';
import {Link} from "react-router-dom";
import TagsBlock from "../TagsBlock/TagsBlock";

export default function SinglePost({post}){
    const [formattedDate,setFormattedDate] = useState([]);
    useEffect(()=>{
        let date = new Date(post.postInfo.dateOfPublished);
        setFormattedDate(DateConverter.formatDate(date));

    },[])

    return (<div className="single-post row">
        <div className="col-lg-4 col-md-3 meta-details">
            <TagsBlock tags={post.tags}/>
            <div className="user-details row">
                <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">{post.author.fullName}</a> <span
                    className="lnr lnr-user"></span></p>
                <p className="date col-lg-12 col-md-12 col-6"><a href="#">{formattedDate}</a> <span
                    className="lnr lnr-calendar-full"></span></p>
                <p className="view col-lg-12 col-md-12 col-6"><a href="#">{post.postInfo.viewsCount} Views</a> <span
                    className="lnr lnr-eye"></span></p>
                <p className="comments col-lg-12 col-md-12 col-6"><a href="#">06 Comments</a> <span
                    className="lnr lnr-bubble"></span></p>
            </div>
        </div>
        <div className="col-lg-8 col-md-9">
            <div className="feature-img">
                <img className="img-fluid" src={Config.SERVER.URL+post.thumbnailPath} alt={post.imgAlt}/>
            </div>
            <Link className="posts-title" to={`/blog/${post.slug}`}><h3>{post.title}</h3></Link>
            <p className="excert">
                {post.shortDescription}
            </p>
            <Link to={`/blog/${post.slug}`} className="primary-btn">View More</Link>
        </div>
    </div>);
}