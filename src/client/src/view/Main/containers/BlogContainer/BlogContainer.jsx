
import BlogBlock from "../../components/BlogBlock/BlogBlock";
import {useEffect, useState} from "react";
import {PostService} from "../../../../service/post.service";

export default function BlogContainer(){
    const POSTS_LIMIT=4;
    const [postsCollection, setPostsCollection] = useState([]);
    const [isLoaded, setIsLoading] = useState(false);

    useEffect(()=>{
         PostService.getRandomPostRange(POSTS_LIMIT)
            .then((res)=>{
                setPostsCollection(res.data);
                setIsLoading(true);

            }).catch((err)=>{
                console.log(err);
        })

    },[]);

    if(!isLoaded){
        return (<h1>Loading...</h1>)
    }
    else {

        return (
            <section className="blog-area section-gap" id="blog">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-70 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">Latest posts from our Blog</h1>
                                <p>In the history of modern astronomy there is.</p>
                            </div>
                        </div>
                    </div>
                    <BlogBlock postsCollection={postsCollection}/>
                </div>
            </section>
        );
    }
}