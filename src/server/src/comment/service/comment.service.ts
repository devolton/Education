import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from '../model/comment.model'
import {CreateCommentDto} from "../dto/create.comment.dto";
import {CommentToPostService} from "./comment.to.post.service";
import {CommentToCourseService} from "./comment.to.course.service";
import {Sequelize} from "sequelize-typescript";
import {User} from "../../user/model/user.model";

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment,
                private commentToPostService: CommentToPostService,
                private commentToCourseService: CommentToCourseService,
                private sequelize: Sequelize) {
    }

    async getAllComments() {
        return await this.commentRepository.findAll();
    }

    async createPostComment(postId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
        const transaction = await this.sequelize.transaction();
        try {
            let comment = await this.commentRepository.create(createCommentDto, {transaction});
            let commentToPost = await this.commentToPostService.createCommentToPostRelation(comment.id, postId, transaction);
            await transaction.commit();
            return comment;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }

    }
    async getCommentById(commentId:number):Promise<Comment>{
        return await this.commentRepository.findByPk(commentId, {include:[{model:User,attributes:['login','avatarPath']}]});
    }

    async createCourseComment(courseId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
        const transaction = await this.sequelize.transaction();
        try {
            let comment = await this.commentRepository.create(createCommentDto);
            let commentToCourse = await this.commentToCourseService.createCommentToCourseRelation(comment.id, courseId, transaction);
            await transaction.commit();
            return comment;

        } catch (e) {
            await transaction.rollback();
        }
    }

    async removeCommentById(commentId: number, isPostComment: boolean = true) {
        let transaction = await this.sequelize.transaction();
        try {
            await this.commentRepository.update({parentId: null}, {where: {parentId: commentId}});
            let removedRows = 0;
            if (isPostComment) {
                removedRows = await this.commentToPostService.removeCommentToPostRelationByCommentId(commentId, transaction);
            } else {
                removedRows = await this.commentToCourseService.removeCommentToCourseRelationByCommentId(commentId, transaction);
            }
            await transaction.commit();
            return removedRows;

        } catch (e) {
            await transaction.rollback();
            throw e;
        }

    }
}
