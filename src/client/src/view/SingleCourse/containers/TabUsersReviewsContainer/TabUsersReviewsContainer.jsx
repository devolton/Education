import TabSingleReview from "../../components/TabSingleReview/TabSingleReview";
import {useEffect} from "react";

export default function TabUsersReviewsContainer({reviewsCollection}) {



    return (<div className="comments-area mb-30">

        {reviewsCollection.map(oneReview => {
            return (<TabSingleReview key={'review-'+oneReview.id} oneReview={oneReview}/>)
        })}
    </div>)
}