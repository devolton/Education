
import Config from '../../../../config';
import PostDetailsBlock from "../PostDetailsBlock/PostDetailsBlock";
import PostNavigationBlock from "../PostNavigationBlock/PostNavigationBlock";
import TabCommentsBlock from "../../../Common/containers/TabCommentsContainer/TabCommentsBlock";
import TagsBlock from "../../../Blog/components/TagsBlock/TagsBlock";
import {useEffect} from "react";

export default function PostBlock({post ,neighbourPostPair}) {

    return (<div className="col-lg-8 posts-list">
        <div className="single-post row">
            <div className="col-lg-12">
                <div className="feature-img">
                    <img className="img-fluid" src={Config.SERVER.URL + post.posterPath} alt={post.imgAlt}/>
                </div>
            </div>
            <div className="col-lg-4  col-md-3 meta-details">
                <TagsBlock tags={post.tags}/>
                <PostDetailsBlock post={post}/>
            </div>
            <div className="col-lg-8 col-md-9">
                <h3 className="mt-20 mb-20">{post.title}</h3>
                <p className="excert">
                    {post.content}
                </p>
            </div>
        </div>
        <PostNavigationBlock neighbourPostsPair={neighbourPostPair}/>
        <TabCommentsBlock commentsCollection={post.comments} postOrCourseId={post.id} isPost={true}/>
    </div>)
}