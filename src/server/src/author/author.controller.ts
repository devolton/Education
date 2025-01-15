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
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthorService} from './author.service';
import {Author} from "./model/author.mode";
import {CreateAuthorDto} from "./dto/create.author.dto";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";
import {UpdateAuthorDto} from "./dto/update.author.dto";
import {ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Author')
@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {
    }

    @Get('/:id')
    async getAuthorById(@Param('id') id: number): Promise<Author> {
        return await this.authorService.getAuthorById(id);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get()
    async getAllAuthors(@Query('page') page: number,
                        @Query('items_per_page') itemPerPage: number,
                        @Query('sort') sortField: string,
                        @Query('order') sortType: string,
                        @Query('search') query: string) {
        return await this.authorService.getAuthorsAndPagination(page, itemPerPage, sortField, sortType, query);
    }

    @Roles('admin')
    @UseInterceptors(FileInterceptor('avatar'))
    @UseGuards(RoleGuard)
    @Post()
    async createAuthor(@Body('author') authorDto: CreateAuthorDto,
                       @UploadedFile() avatar: Express.Multer.File): Promise<Author> {
        return await this.authorService.createAuthor(authorDto,avatar);
    }

    @Put('/:id')
    async updateAuthor(@Param('id') authorId: number,
                       @Body('author') updateAuthorDto: UpdateAuthorDto) {
        return await this.authorService.updateAuthor(authorId, updateAuthorDto);
    }

    @UseInterceptors(FileInterceptor('avatar'))
    @Put('/avatar/:id')
    async updateAvatar(@Param('id') id: number,
                       @UploadedFile() avatar: Express.Multer.File) {
        return await this.authorService.updateAvatar(id, avatar);
    }

    @Delete('/:id')
    async removeAuthor(@Param('id') authorId: number) {
        return await this.authorService.removeAuthor(authorId);
    }

    @Delete('/avatar/:id')
    async removeAvatar(@Param('id') id: number) {
        return await this.authorService.removeAvatar(id);
    }
}
