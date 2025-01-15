import {Injectable} from '@nestjs/common';
import {Review} from "./model/review.model";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../user/model/user.model";
import {CreateReviewDto} from "./dto/create.review.dto";
import {Op, Transaction} from "sequelize";
import {PaginationService} from "../pagination/pagination.service";
import {Course} from "../course/model/course.model";

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review) private reviewRepository:typeof Review,
                private paginationService:PaginationService) {
    }

    async getReviewsAndPagination(page:number =1, itemsRerPage:number=5,sortField:string='id', sortType:string='asc', search:string=''){
        let count = await this.reviewRepository.count();
        let pagination = await this.paginationService.createNavigation(page,itemsRerPage,count);
        let offset = (page-1)*itemsRerPage;
        let reviews = await this.reviewRepository.findAll({
            where:{
                review:{[Op.iLike]:`${search}%`}
            },
            limit:itemsRerPage,
            offset:offset,
            order:[[sortField,sortType.toUpperCase()]],
            include:[
                {
                    model:User
                },
                {
                    model:Course
                }
            ]
        })
        return {data:reviews,payload:pagination};
    }

    async getAllReviews(offset:number,limit:number): Promise<Review[]> {
       return this.reviewRepository.findAll({include:{model:User, attributes:['login', 'avatarPath']},offset:offset,limit:limit})
    }
    async getRandomReviews(limit:number):Promise<Review[]>{
        return await this.reviewRepository.findAll({
            order: this.reviewRepository.sequelize.literal('RANDOM()'),
            limit:limit,
            include:[{model:User, attributes:['login','avatarPath']}]
        })
    }
    async createReview(reviewDto:CreateReviewDto):Promise<Review>{
        return await this.reviewRepository.create(reviewDto);
    }
    async removeByUserId(userId:number,transaction:Transaction=null):Promise<number>{
        return await this.reviewRepository.destroy({where:{userId:userId},transaction});
    }
    async removeReview(reviewId:number):Promise<number>{
        return await this.reviewRepository.destroy({where:{id:reviewId}});
    }
}
