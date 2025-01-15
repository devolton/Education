import {Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import {ReviewService} from './review.service';
import {Review} from "./model/review.model";
import {CreateReviewDto} from "./dto/create.review.dto";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";
import {JwtAuthGuard} from "../token/guard/jwt.auth.guard";
import {AddUserIdInterceptor} from "../interceptors/add.user.id.interceptor";
import {Request} from "express";

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {
    }


    @Get()
    async getAllReviews(@Query('offset') offset: number, @Query('limit') limit: number): Promise<Review[]> {
        return await this.reviewService.getAllReviews(offset, limit);
    }
    @Get('/for-admin')
    async getReviewAndPagination(@Query('page')page:number,
                                 @Query('items_per_page') itemPerPage:number,
                                 @Query('sort')sortField:string,
                                 @Query('order') sortType:string,
                                 @Query('search') query:string){
        return await this.reviewService.getReviewsAndPagination(page,itemPerPage,sortField,sortType,query);
    }

    @Get('/random')
    async getRandomReviews(@Query('limit') limit: number): Promise<Review[]> {
        return await this.reviewService.getRandomReviews(limit);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AddUserIdInterceptor)
    @Post()
    async createReview(@Req() req: Request,
                       @Body('review') reviewDto: CreateReviewDto): Promise<Review> {
        reviewDto.userId = req.body.userId;
        return await this.reviewService.createReview(reviewDto);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async deleteReview(@Param('id') id: number): Promise<number> {
        return await this.reviewService.removeReview(id);
    }
}
