import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {CommentToPost} from "../model/comment.to.post.model";
import {Transaction} from "sequelize";

@Injectable()
export class CommentToPostService{
    constructor(@InjectModel(CommentToPost) private commentToPostRepository:typeof CommentToPost) {
    }
    async createCommentToPostRelation(commentId:number, postId:number,transaction:Transaction=null):Promise<CommentToPost>{
        return await this.commentToPostRepository.create({commentId:commentId, postId:postId},{transaction});
    }
    async removeCommentToPostRelationByCommentId(commentId:number, transaction:Transaction=null){
        return await this.commentToPostRepository.destroy({where:{commentId:commentId},transaction},);
    }
}