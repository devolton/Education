import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {PostCategoryService} from './post-category.service';
import {CreatePostCategoryDto} from "./dto/create.post.category.dto";
import {PostCategory} from "./model/post.category.model";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";
import {UpdatePostCategoryDto} from "./dto/update.post.category.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('post-categories')
export class PostCategoryController {
    constructor(private readonly postCategoryService: PostCategoryService) {
    }

    @Get()
    async getCategories(@Query('items_per_page') itemsPrePage:number,
                        @Query('page')page:number,
                        @Query('sort') sortField:string,
                        @Query('order') sortType:string,
                        @Query('search') search:string) {
        return await this.postCategoryService.getPostCategories(page,itemsPrePage,sortField,sortType,search);
    }

    @Get('/random')
    async getRandomCategories(@Query('limit') limit: number): Promise<PostCategory[]> {
        return await this.postCategoryService.getRandomPostCategories(limit);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/:id')
    async getCategoryById(@Param('id') id: number){
        return await this.postCategoryService.getCategoryById(id);
    }

    @Roles('admin')
    @UseInterceptors(FileInterceptor('thumbnail'))
    @UseGuards(RoleGuard)
    @Post()
    async createCategory(@Body('category') postCategoryDto: CreatePostCategoryDto,
                         @UploadedFile() image:Express.Multer.File): Promise<PostCategory> {
        return await this.postCategoryService.createPostCategory(postCategoryDto,image);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Put('/:id')
    async updatePostCategory(@Param('id') id: number,
                             @Body('post-category') updateCategoryDto: UpdatePostCategoryDto): Promise<PostCategory> {
        return await this.postCategoryService.updatePostCategory(id, updateCategoryDto);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('thumbnail'))
    @Put('/thumbnail/:id')
    async updateThumbnail(@UploadedFile()image,
                          @Param('id')id:number){
        console.log(image.size);
        return await this.postCategoryService.updateCategoryThumbnail(id,image);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async deletePostCategory(@Param('id') categoryId: number) {
        return await this.postCategoryService.removePostCategory(categoryId);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/thumbnail/:id')
    async removeThumbnail(@Param('id')id:number){
        return await this.postCategoryService.removeThumbnailOfCategory(id);
    }

}
