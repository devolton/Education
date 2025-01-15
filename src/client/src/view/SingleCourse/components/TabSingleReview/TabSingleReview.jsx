import Config from '../../../../config';
import {Rating} from "@mui/material";


export default function TabSingleReview({oneReview}){

    return ( <div className="comment-list">
        <div className="single-comment single-reviews justify-content-between d-flex">
            <div className="user justify-content-between d-flex">
                <div className="thumb">
                    <img src={Config.SERVER.URL+oneReview.author.avatarPath} alt="image"/>
                </div>
                <div className="desc">
                    <h5>{oneReview.author.login}
                        <div className="star">
                            <Rating name="read-only" size={"small"} value={parseFloat(oneReview.rating)} precision={0.1} readOnly />
                        </div>
                    </h5>
                    <p className="comment">
                        {oneReview.review}
                    </p>
                </div>
            </div>
        </div>
    </div>)
}