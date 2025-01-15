import NavPostItem from "../WidgetItems/NavPostItem/NavPostItem";

export default function PostWidgetBlock({postsCollection}){

    return (   <div className="popular-post-list">
        {
            postsCollection.map((onePost)=>{
                return (<NavPostItem  key={'nav-postItem'+onePost.id} post={onePost}/>)
            })
        }
    </div>)
}