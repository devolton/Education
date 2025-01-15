import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Comment.css'
import { DateConverter } from "../../../../tools/DateConverter";
import Config from "../../../../config";
import { CommentService } from "../../../../service/comment.service";

export default function Comment({ comment, postOrCourseId,isPost, isIncludedComment =false}) {
    const [formattedDate, setFormattedDate] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [userAnswerComment, setUserAnswerComment] = useState("");

    useEffect(() => {
        setFormattedDate(DateConverter.formatDateTime(comment.createdAt));
    }, [comment.createdAt,comment.children]);

    function sendAnswerComment() {

        const commentObj = {
            comment: userAnswerComment,
            parentId: comment.id,
        };
        CommentService.postComment(commentObj, postOrCourseId,isPost).then((res) => {
            if (res.status === 201) {
                console.log(res.data);
                let createdComment= res.data;
                createdComment.children=[];
                comment.children.push(createdComment);
                setShowInput(false);
                setUserAnswerComment("");
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className={isIncludedComment ? "comment-list left-padding" : "comment-list"}>
            <div className="mt-3 single-comment justify-content-between d-flex">
                <div className="user justify-content-between d-flex">
                    <div className="thumb">
                        <img
                            src={Config.SERVER.URL + comment.user.avatarPath}
                            alt="userAvatar"
                        />
                    </div>
                    <div className="desc">
                        <h5>
                            <a type="button" className="btn btn-link">
                                {comment.user.login}
                            </a>
                        </h5>
                        <p className="date">{formattedDate}</p>
                        <p className="comment">{comment.comment}</p>
                    </div>
                </div>
                <div className="reply-btn">
                    <a
                        type="button"
                        onClick={() => setShowInput(!showInput)}
                        className="btn-reply text-uppercase"
                    >
                        reply
                    </a>
                </div>
            </div>
            {showInput && (
                <div className="input-group mb-3 ms-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Input comment"
                        value={userAnswerComment}
                        onChange={(e) => setUserAnswerComment(e.target.value)}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                        <button
                            onClick={sendAnswerComment}
                            className="btn btn-outline-warning"
                            type="button"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
            {comment.children.map(child => (
                <Comment key={child.id} postOrCourseId={postOrCourseId} comment={child} isIncludedComment={true} isPost={isPost}/>
            ))}
        </div>
    );
}
