import SmallBannerArea from "../../../Common/containers/SmallBannerArea/SmallBannerArea";
import SingleBlogMainContainer from "../../containers/SingleBlogMainContainer/SingleBlogMainContainer";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {PostService} from "../../../../service/post.service";

export default function SingleBlogPage(){
    const [post,setPost]=useState(null);
    const [neighbourPostPair,setNeighbourPostPair] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const {slug} = useParams();


    useEffect(()=>{
        initNeighboursPosts();
        initPost();


    },[slug])

    function initPost(){
        PostService.getPostBySlug(slug)
            .then((res)=>{
                setPost(res.data);
                setIsLoaded(true);

            }).catch((err)=>{
                console.log(err);
        });
    }
    function initNeighboursPosts(){
       PostService.getPostNeighbours(slug)
            .then((res)=>{
                setNeighbourPostPair(res.data);

            }).catch(err=>{
                console.log(err);
        })

    }
    if(!isLoaded){
        return (<h1>Loading...</h1>)
    }
    else {

        return (
            <>
                <SmallBannerArea currentPageName={post.title} imagePath={post.posterPath}/>
                <SingleBlogMainContainer post={post} neighbourPostPair={neighbourPostPair}/>
            </>
        )
    }
}
