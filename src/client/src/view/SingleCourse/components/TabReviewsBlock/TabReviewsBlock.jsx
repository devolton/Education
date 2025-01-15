import {useEffect, useRef, useState} from "react";
import {Rating} from '@mui/material';
import TabUsersReviewsContainer from "../../containers/TabUsersReviewsContainer/TabUsersReviewsContainer";
import {useAuth} from "../../../../contexts/AuthContext";
import NotificationAlert from "../../../Common/components/NotificationAlert/NotificationAlert";
import ReviewService from "../../../../service/review.service";
import {UserService} from "../../../../service/user.service";

export default function TabReviewsBlock({course, reviewsCollection}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const {isAuthenticated} = useAuth();
    const [isReadonlyRating, setIsReadonlyRating] = useState(false);
    const [userRatingTitle, setUserRatingTitle] = useState("Provide Your Rating");
    const [isVisibleReviewTextblock, setIsVisibleReviewTextblock] = useState(true);
    const [ratingValue, setRatingValue] = useState(1);
    const [userReview, setUserReview] = useState('');
    const unauthorizedAlertTitle = "Please log in to be able to leave a review";
    useEffect(() => {
       let currentUserReview= course.reviews.find((review)=>{
            return review.userId===UserService.id;
        })
        if(currentUserReview){
            setRatingValue(currentUserReview.rating);
            setIsReadonlyRating(true);
            setIsVisibleReviewTextblock(false);
            setUserRatingTitle("Your Rating")
            setUserReview('');
            setIsLoaded(true);
        }

    },[])


    function sendReview() {
        let review = {
            review: userReview,
            rating: ratingValue,
            courseId: course.id
        }
        ReviewService.postReview(review).then(res => {
            if (res.status === 201) {
                setIsReadonlyRating(true);
                setIsVisibleReviewTextblock(false);
                setUserRatingTitle("Your Rating")
                setUserReview('');

            } else {
                console.log("ADDING REVIEW ERROR!");
            }
        }).catch((err) => {
            console.log(err);
        })


    }

    return (
        <div>
            <TabUsersReviewsContainer reviewsCollection={reviewsCollection}/>{
            (!isAuthenticated) ? (<NotificationAlert title={unauthorizedAlertTitle}/>) :
                <div>
                    <div className="review-top row pt-40">
                        <div className="col-lg-9">
                            <h4 className="mb-20">{userRatingTitle}</h4>
                            <div className="d-flex flex-row reviews">
                                <Rating
                                    name="simple-controlled"
                                    value={ratingValue}
                                    readOnly={isReadonlyRating}
                                    onChange={(event, newValue) => {
                                        setRatingValue(newValue);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {(isVisibleReviewTextblock) ?
                        <div className="feedeback">
                            <h4 className="pb-20">Your Feedback</h4>
                            <textarea name="feedback" className="form-control"
                                      value={userReview}
                                      onChange={(e) => {
                                          setUserReview(e.target.value)
                                      }}
                                      cols="10"
                                      rows="10"></textarea>
                            <button type={'button'} onClick={() => {
                                sendReview()
                            }} className="mt-20 primary-btn text-right text-uppercase">Send
                            </button>
                        </div> : <></>
                    }
                </div>
        }
        </div>
    );
}