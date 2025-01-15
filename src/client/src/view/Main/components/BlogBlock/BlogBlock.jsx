import PostCard from "../PostCard/PostCard";

export default function BlogBlock({postsCollection}){

    return (<div className="row">
        {
            postsCollection.map((onePost)=>{
                return (<PostCard key={'post'+onePost.id} post={onePost}/> )

            })
        }

    </div>)
}