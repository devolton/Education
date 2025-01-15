import SinglePost from "../../components/SinglePost/SinglePost";
import PostsPagination from "../../components/PostsPagination/PostsPagination";
import {useEffect, useState} from "react";
import {PostFetchService} from "../../../../tools/PostFetchService";


export default function BlogPostsContainer({postsCollection}) {
    const [pagObjCollection, setPagObjCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        PostFetchService.refreshPaginationHook=setPagObjCollection;
        setPagObjCollection(PostFetchService.initPaginationCollection());
        setIsLoaded(true)


    }, [])
    if (!isLoaded) {
        return <h1>Loading...</h1>
    } else {
        return (<div className="col-lg-8 posts-list">
            {
                postsCollection.map((onePost) => {
                    return (<SinglePost key={'single-post'+onePost.id} post={onePost}/>)
                })
            }
            <PostsPagination pagObjCollection={pagObjCollection}/>
        </div>);
    }
}