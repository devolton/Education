import Config from '../../../../../../config';
import {useEffect, useState} from "react";
import {DateConverter} from "../../../../../../tools/DateConverter";
import {Link} from "react-router-dom";

export default function NavPostItem({post, key}){
    const [formattedDate, setFormattedDate]=useState('11-11-2024');
    useEffect(()=>{
        let date = new Date(post.postInfo.dateOfPublished);
        setFormattedDate(DateConverter.formatDate(date));

    },[]);

    return(<div key={key} className="single-post-list d-flex flex-row align-items-center">
        <div className="col-5 thumb">
            <img className="img-fluid " src={Config.SERVER.URL+post.thumbnailPath} alt={post.imgAlt}/>
        </div>
        <div className="col-7 details">
            <Link to={`/blog/${post.slug}`}><h6>{post.title}</h6></Link>
            <p>{formattedDate}</p>
        </div>
    </div>)
}