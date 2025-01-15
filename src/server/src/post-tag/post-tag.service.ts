import {Injectable, UseGuards} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {PostTag} from "./model/post.tag.model";
import {CreatePostTagDto} from "./dto/create.post.tag.dto";
import {RoleGuard} from "../token/guard/role.guard";
import {Roles} from "../decorators/roles.auth.decorator";
import {PaginationService} from "../pagination/pagination.service";
import {Op} from "sequelize";
import {UpdatePostTagDto} from "./dto/update.post.tag.dto";

@Injectable()
export class PostTagService {
    constructor(@InjectModel(PostTag) private postTagRepository: typeof PostTag,
                private paginationService: PaginationService) {}

    async getAllTags(pageNum: number=1, itemsPerPage: number=100, sortField: string = "id", sortType: string = 'asc', search: string = ''){
        let tagsCount =await this.postTagRepository.count();
        let pagination = await this.paginationService.createNavigation(pageNum,itemsPerPage,tagsCount);
        let limit = itemsPerPage;
        let offset = itemsPerPage*(pageNum-1);
        let tags = await this.postTagRepository.findAll(
            {
                where:{
                    name:{[Op.iLike]:`${search}%`}
                },
                limit:limit,
                offset:offset,
                order:[[sortField,sortType.toUpperCase()]]
            }
        )
        return {data:tags, payload:pagination};
    }

    async createTag(tagDto:CreatePostTagDto): Promise<PostTag>{
        return await this.postTagRepository.create(tagDto);
    }

    async getTagByName(name:string) :Promise<PostTag>{
        return await this.postTagRepository.findOne({where:{name:name}});
    }
    async getTagById(id:number):Promise<PostTag>{
        return await this.postTagRepository.findByPk(id);
    }
    async updateTag(id:number,updatePostTagDto:UpdatePostTagDto){
        return await this.postTagRepository.update({name:updatePostTagDto.name},{where:{id:id}});
    }
    async removeTag(tagId:number):Promise<number>{
        return await this.postTagRepository.destroy({where:{id:tagId}});
    }
}
