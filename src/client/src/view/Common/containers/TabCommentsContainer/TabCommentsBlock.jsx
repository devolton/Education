
import Comment from "../../components/Comment/Comment";
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../../../../contexts/AuthContext";
import NotificationAlert from "../../components/NotificationAlert/NotificationAlert";
import {CommentService} from "../../../../service/comment.service";
import {CommentAdapter} from "../../../../tools/CommentAdapter";


export default function TabCommentsBlock({commentsCollection,postOrCourseId,isPost}) {
    let containerRef= useRef(null);
    const [userComment,setComment] = useState('');
    const [commentTree, setCommentsTree] = useState([])
    const {isAuthenticated} = useAuth();
    const unauthorizedMessage = "Please log in to be able to leave a comment!";
    useEffect(()=>{
        setCommentsTree(CommentAdapter.buildCommentThree(commentsCollection));
    },[commentsCollection]);
    function sendComment(){
        let comObj={
            comment:userComment,
            parentId:null
        }
        CommentService.postComment(comObj,postOrCourseId,isPost)
            .then(res=>{
                if(res.status===201){
                    commentsCollection.push(res.data);
                    setCommentsTree(CommentAdapter.buildCommentThree(commentsCollection));
                    setComment('');
                }
            }).catch(err=>{
                console.log(err);
        })
    }


    return (
        <div className='comment-wrap'>
            <div ref={containerRef} className="comments-area">
                <h4>{commentsCollection.length+ ' Comments'} </h4>
                {
                    commentTree.map(oneComment=>{
                        return <Comment key={'comment-'+oneComment.id} comment={oneComment} postOrCourseId={postOrCourseId} isPost={isPost} isIncludedComment={false}/>
                    })
                }
            </div>
            {(!isAuthenticated) ? <NotificationAlert title={unauthorizedMessage}/> :
            <div className="comment-form">
                <h4>Leave a Comment</h4>
                <form>
                    <div className="form-group">
                                                <textarea className="form-control mb-10" rows="5" name="message"
                                                          value={userComment}
                                                          onChange={(e)=>{setComment(e.target.value)}}
                                                          placeholder="Messege"
                                                          ></textarea>
                    </div>
                    <a type={'button'} onClick={sendComment} className="mt-40 text-uppercase genric-btn primary text-center">Post
                        Comment</a>
                </form>
            </div>
            }
        </div>
    )
}