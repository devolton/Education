import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import {CommentService} from './service/comment.service';
import {CreateCommentDto} from "./dto/create.comment.dto";
import {ApiTags} from "@nestjs/swagger";
import {Comment} from './model/comment.model'
import {JwtAuthGuard} from "../token/guard/jwt.auth.guard";
import {AddUserIdInterceptor} from "../interceptors/add.user.id.interceptor";
import {Request} from "express";

@ApiTags('Comment')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {
    }

    @Get()
    async getAllComments() {
        return await this.commentService.getAllComments();
    }
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AddUserIdInterceptor)
    @Post('/post/:id')
    async createPostComment(@Req() req: Request,
                            @Param('id') postId: number,
                            @Body('comment') commentDto: CreateCommentDto): Promise<Comment> {
        commentDto.userId = req.body.userId;
        let createdComment= await this.commentService.createPostComment(postId, commentDto);
        if(createdComment){
            return this.commentService.getCommentById(createdComment.id);
        }
        return null;


    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AddUserIdInterceptor)
    @Post('/course/:id')
    async createCourseComment(@Req() req: Request,
                              @Param('id') courseId: number,
                              @Body('comment') commentDto: CreateCommentDto): Promise<Comment> {
        commentDto.userId = req.body.userId;
        let createdComment= await this.commentService.createCourseComment(courseId, commentDto);
        if(createdComment){
            return this.commentService.getCommentById(createdComment.id);
        }
        return null;
    }

    @Delete('/course/:id')
    async deleteCourseCommentById(@Param('id') commentId: number) {
        return await this.commentService.removeCommentById(commentId, false);
    }

    @Delete('/post/:id')
    async deletePostCommentById(@Param('id') commentId: number) {
        return await this.commentService.removeCommentById(commentId);
    }
}

