import React, {useEffect, useState} from "react";
import CarouselSliderReviewsContainer from "../CarouselSliderReviewsContainer/CarouselSliderReviewsContainer";
import ReviewService from "../../../../service/review.service";
import Loading from "../../../Common/components/Loading/Loading";

export default function ReviewContainer() {
    const LIMIT= 4;
    const [reviewsCollection, setReviewsCollection] = useState([]);
    const [isLoaded , setIsLoaded] = useState(false);

    useEffect(() => {
        ReviewService.getRandomReviewsRange(LIMIT)
            .then(res=>{
                setReviewsCollection(res.data);
                setIsLoaded(true);
            }).catch(err=>{
                console.log(err);
        })


    }, []);

    if(!isLoaded){
        return (<Loading/>)
    }
    else {
        return (
            <section className="review-area section-gap relative">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="w-100">
                        <CarouselSliderReviewsContainer reviewCollection={reviewsCollection}/>
                    </div>
                </div>
            </section>
        )
    }
}