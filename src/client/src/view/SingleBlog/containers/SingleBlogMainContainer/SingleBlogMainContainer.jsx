
import AuthorInfoBlock from "../../components/AuthorInfoBlock/AuthorInfoBlock";
import PostBlock from "../../components/PostBlock/PostBlock";

export default function SingleBlogMainContainer({post, neighbourPostPair}){


    return (
        <section className="post-content-area single-post-area">
            <div className="container">
                <div className="row">
                    <PostBlock post={post} neighbourPostPair={neighbourPostPair}/>
                    <AuthorInfoBlock author={post.author}/>
                </div>
            </div>
        </section>
    )
}