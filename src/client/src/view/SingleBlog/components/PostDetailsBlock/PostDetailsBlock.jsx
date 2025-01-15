import {useState} from "react";
import {DateConverter} from "../../../../tools/DateConverter";

export default function PostDetailsBlock({post}){
    const [formattedDate,setFormattedDate] = useState('11-11-2024');

    useState(()=>{
        let date = new Date(post.postInfo.dateOfPublished);
        setFormattedDate(DateConverter.formatDate(date));
    })

    return (<div className="user-details row">
        <p className="user-name col-lg-12 col-md-12 col-6"><a type={'button'}>{post.author.fullName}</a><span
            className="lnr lnr-user"></span></p>
        <p className="date col-lg-12 col-md-12 col-6"><a type={'button'}>{formattedDate}</a> <span
            className="lnr lnr-calendar-full"></span></p>
        <p className="view col-lg-12 col-md-12 col-6"><a type={'button'}>{post.postInfo.viewsCount+' Views'} </a> <span
            className="lnr lnr-eye"></span></p>
        <p className="comments col-lg-12 col-md-12 col-6"><a type={'button'}>{post.comments.length+' Comments'}</a> <span
            className="lnr lnr-bubble"></span></p>
    </div>)
}