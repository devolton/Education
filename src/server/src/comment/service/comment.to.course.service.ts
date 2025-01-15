import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {CommentToCourse} from "../model/comment.to.course.model";
import {Transaction} from "sequelize";

@Injectable()
export class CommentToCourseService{
    constructor(@InjectModel(CommentToCourse) private commentToCourseRepository:typeof CommentToCourse) {
    }

    async createCommentToCourseRelation(commentId:number,courseId:number,transaction:Transaction=null):Promise<CommentToCourse>{
        return await this.commentToCourseRepository.create({commentId:commentId,courseId:courseId},{transaction});
    }

    async removeCommentToCourseRelationByCommentId(commentId:number, transaction:Transaction=null){
        return await this.commentToCourseRepository.destroy({where:{commentId:commentId}, transaction})
    }
}