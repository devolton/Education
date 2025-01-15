import {Rating} from "@mui/material";

export default function SingleReview({oneReview}){

    return(

        <div className="single-review item">
            <div className="title justify-content-start d-flex">
               <h4>{oneReview.author.login}</h4>
                <div className="star">
                    <Rating name="read-only" size={"small"} value={oneReview.rating} precision={0.1} readOnly />
                </div>
            </div>
            <p>
                {oneReview.review}
            </p>
        </div>
    );
}