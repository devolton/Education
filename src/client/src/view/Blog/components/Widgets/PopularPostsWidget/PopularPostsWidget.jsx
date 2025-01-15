import NavPostItem from "../WidgetItems/NavPostItem/NavPostItem";
import PostWidgetBlock from "../PostWidgetBlock/PostWidgetBlock";
import {useEffect, useState} from "react";
import Config from '../../../../../config';
import {PostService} from "../../../../../service/post.service";


export default function PopularPostsWidget() {
    const LIMIT=5;
    const [postsCollection, setPostsCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(()=>{
        PostService.getTopViewsPostRange(LIMIT)
            .then((res)=>{
                setPostsCollection(res.data);
                setIsLoaded(true);
            })
            .catch((err)=>{
                console.log(err);
            })

    },[]);

    if (!isLoaded) {
        return (<h1>Loading...</h1>);
    } else {

        return (<div className="single-sidebar-widget popular-post-widget">
            <h4 className="popular-title">Popular Posts</h4>
            <PostWidgetBlock postsCollection={postsCollection}/>
        </div>)
    }
}