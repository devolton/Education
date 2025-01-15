import api from "../http/core";

export class CommentService{

    static async postComment(comment,postId,isPost){
        return await api.post(`/comments/${isPost ? 'post':'course'}/${postId}`,{comment:comment});
    }
}