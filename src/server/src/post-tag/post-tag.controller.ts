import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {PostTagService} from './post-tag.service';
import {PostTag} from "./model/post.tag.model";
import {CreatePostTagDto} from "./dto/create.post.tag.dto";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";
import {UpdatePostTagDto} from "./dto/update.post.tag.dto";

@Controller('post-tags')
export class PostTagController {
    constructor(private readonly postTagService: PostTagService) {
    }
    @Get()
    async getAllTags(@Query('items_per_page') itemsPrePage: number,
                     @Query('page') page: number,
                     @Query('sort') sortField: string,
                     @Query('order') sortType: string,
                     @Query('search') search: string) {
        return await this.postTagService.getAllTags(page, itemsPrePage, sortField, sortType, search);
    }
    @Put('/:id')
    async updateTag(@Param('id') id:number,
        @Body('tag') updatePostTagDto:UpdatePostTagDto){
        return await this.postTagService.updateTag(id,updatePostTagDto)
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post()
    async createTag(@Body('tag') tagDto: CreatePostTagDto): Promise<PostTag> {
        return await this.postTagService.createTag(tagDto)
    }

    @Get('/:id')
    async getTagById(@Param('id') id: number): Promise<PostTag> {
        return await this.postTagService.getTagById(id);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async deleteTag(@Param('id') id: number) {
        return await this.postTagService.removeTag(id);
    }
}
