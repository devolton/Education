import BlogMainContainer from "../../containers/BlogMainContainer/BlogMainContainer";
import BlogCategoryWidgetsContainer from "../../containers/BlogTopCategoryBlock/BlogCategoryWidgetsContainer";
import BlogBannerContainer from "../../containers/BlogBannerContainer/BlogBannerContainer";
import {useEffect, useState} from "react";
import {PostFetchService} from "../../../../tools/PostFetchService";
import {PostService} from "../../../../service/post.service";

export default function BlogPage() {

    const [postsCollection, setPostsCollection] = useState([]);
    const [bannerPost, setBannerPost] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        PostFetchService.refreshPostsHook = setPostsCollection;
        initPosts();

    }, [])

    function initPosts() {
        PostService.getPostRange()
            .then((res) => {
                setPostsCollection(res.data.posts);
                setBannerPost(res.data.posts[Math.floor(Math.random() * (PostFetchService.limit - 1))]);
                PostFetchService.pageCount = Number.parseInt(res.data.pageCount);
                setIsLoaded(true);

            }).catch((err) => {
            console.log(err);
        })
    }

    if (!isLoaded) {
        return (<h1>Loading...</h1>)
    } else {

        return (
            <>
                <BlogBannerContainer post={bannerPost}/>
                <BlogCategoryWidgetsContainer refreshPostsCollectionHook={setPostsCollection}/>
                <BlogMainContainer postsCollection={postsCollection}/>
            </>
        )
    }
}