import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {PostService} from './service/post.service';
import {CreatePostInfoDto} from "./dto/create.post.info.dto";
import {CreatePostDto} from "./dto/create.post.dto";
import {UpdatePostDto} from "./dto/update.post.dto";
import {UpdatePostInfoDto} from "./dto/update.post.info.dto";
import {RoleGuard} from "../token/guard/role.guard";
import {Roles} from "../decorators/roles.auth.decorator";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @Post()
    async createPost(@Body('post_info') postInfoDto: CreatePostInfoDto,
                     @Body('post') postDto: CreatePostDto) {
        console.log(postInfoDto);
        return await this.postService.createPost(postInfoDto, postDto);
    }
    @Get()
    async getPosts(@Query('limit') limit: number,
                   @Query('offset') offset: number,
                   @Query('category') category: string,
                   @Query('tag') tag: string,
                   @Query('query') query: string) {
        return await this.postService.getPosts(offset, limit, category, tag, query);
    }
    @Get('/admin')
    async getPostsForAdmin(@Query('page')page:number,
                           @Query('items_per_page') itemPerPage:number,
                           @Query('sort')sortField:string,
                           @Query('order') sortType:string,
                           @Query('search') query:string){

        return this.postService.getPostsAndPagination(page,itemPerPage,sortField,sortType,query);
    }

    @Get('/random')
    async getRandomPosts(@Query('limit') limit: number) {
        return await this.postService.getRandomPosts(limit);
    }

    @Get('/topViews')
    async getTopViews(@Query('limit') limit: number) {
        return await this.postService.getTopViewsPosts(limit);
    }

    @Get('/neighbours/:slug')
    async getNeighboursePosts(@Param('slug') slug: string) {
        return await this.postService.getNeighbourSlugsPair(slug);
    }

    @Get('/:slug')
    async getPostBySlug(@Param('slug') slug: string) {
        return await this.postService.getPostBySlug(slug);
    }

    @Get('/byId/:id')
    async getPostById(@Param('id') id: number) {
        return await this.postService.getPostById(id);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Put('/:id')
    async updatePost(@Param('id') id: number,
                     @Body('post') updatePostDto: UpdatePostDto,
                     @Body('post_info') updatePostInfoDto: UpdatePostInfoDto) {
        return await this.postService.updatePost(id, updatePostDto, updatePostInfoDto);
    }

    @UseInterceptors(FileInterceptor('thumbnail'))
    @Put('/thumbnail/:id')
    async updatePostThumbnail(@UploadedFile() thumbnail: Express.Multer.File,
                              @Param('id') id: number) {
        return await this.postService.updateThumbnailOfPost(id, thumbnail);
    }

    @UseInterceptors(FileInterceptor('poster'))
    @Put('/poster/:id')
    async updatePostPoster(@UploadedFile() poster: Express.Multer.File,
                           @Param('id') id: number) {
        console.log("Id:");
        console.log(id);
        return await this.postService.updatePosterOfPost(id, poster);
    }

    @Delete('/:id')
    async removePost(@Param('id') postId: number) {
        return await this.postService.removePost(postId);
    }

    @Delete('/poster/:id')
    async removePoster(@Param('id') id: number) {
        return await this.postService.removePosterOfPost(id);
    }

    @Delete('/thumbnail/:id')
    async removeThumbnail(@Param('id') id: number) {
     return await this.postService.removeThumbnailOfPost(id);
    }
}
