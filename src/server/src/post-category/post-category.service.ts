import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {PostCategory} from "./model/post.category.model";
import {CreatePostCategoryDto} from "./dto/create.post.category.dto";
import {UpdatePostCategoryDto} from "./dto/update.post.category.dto";
import {PaginationService} from "../pagination/pagination.service";
import {Op} from "sequelize";
import {FilesService} from "../files/files.service";
import {Config} from "../Config";
import {NotFoundException} from "../exceptions/not.found.exception";

@Injectable()
export class PostCategoryService {
    constructor(@InjectModel(PostCategory) private postCategoryRepository: typeof PostCategory,
                private paginationService: PaginationService,
                private fileService: FilesService) {
    }

    async getPostCategories(page: number = 1, itemPrePage: number = 100, sortField: string = 'id', sortType: string = 'asc', search: string = '') {
        let count = await this.postCategoryRepository.count();
        let pagination = await this.paginationService.createNavigation(page, itemPrePage, count);
        let offset = (page - 1) * itemPrePage;
        let categories = await this.postCategoryRepository.findAll({
            where: {
                name: {[Op.iLike]: `${search}%`},
            },
            limit: itemPrePage,
            offset: offset,
            order: [[sortField, sortType.toUpperCase()]]
        })
        return {data: categories, payload: pagination};
    }

    async getRandomPostCategories(limit): Promise<PostCategory[]> {
        return await this.postCategoryRepository.findAll({
            order: this.postCategoryRepository.sequelize.literal('RANDOM()'),
            limit: limit
        })
    }

    async getCategoryById(id: number) {
        return await this.postCategoryRepository.findByPk(id);
    }

    async updateCategoryThumbnail(categoryId: number, image: Express.Multer.File) {
        const category = await this.postCategoryRepository.findByPk(categoryId);
        if (!category) {
            throw new NotFoundException("Category", categoryId);
        }
        const thumbnailPath = await this.fileService.createFile(image, category.name, Config.PATH.BLOG.CATEGORY.THUMBNAILS_FOLDER);
        return await category.update({thumbnailPath: thumbnailPath});
    }

    async createPostCategory(postCategoryDto: CreatePostCategoryDto, image: Express.Multer.File): Promise<PostCategory> {
        let updateThumbnailPath = postCategoryDto.thumbnailPath;
        let categoryWithCurrentName = await this.postCategoryRepository.findOne({where: {name: postCategoryDto.name}});
        if (categoryWithCurrentName)
            throw new HttpException('Category with current name is already exist!', HttpStatus.BAD_REQUEST)
        if (image) {
            updateThumbnailPath = await this.fileService.createFile(image, postCategoryDto.name, Config.PATH.BLOG.CATEGORY.THUMBNAILS_FOLDER);
        }
        return await this.postCategoryRepository.create({

            ...postCategoryDto,
            thumbnailPath: updateThumbnailPath
        });
    }

    async updatePostCategory(categoryId: number, updatePostCategoryDto: UpdatePostCategoryDto): Promise<PostCategory> {
        let categoryForUpdate = await this.postCategoryRepository.findByPk(categoryId);
        if (!categoryForUpdate)
            throw new NotFoundException("Category", categoryId);
        return await categoryForUpdate.update(updatePostCategoryDto);
    }

    async removePostCategory(categoryId: number) {
        let category = await this.postCategoryRepository.findByPk(categoryId);
        if (!category)
            throw new NotFoundException("Category",categoryId);
        if (category.thumbnailPath !== Config.PATH.BLOG.CATEGORY.DEFAULT_THUMBNAIL) {
            await this.fileService.removeFile(category.thumbnailPath);
        }
        return category.destroy();
    }

    async removeThumbnailOfCategory(categoryId: number) {
        const category = await this.postCategoryRepository.findByPk(categoryId);
        if (!category) {
            throw new NotFoundException("Category",categoryId);
        }
        if (category.thumbnailPath === Config.PATH.BLOG.CATEGORY.DEFAULT_THUMBNAIL)
            return;
        return await category.update({thumbnailPath: Config.PATH.BLOG.CATEGORY.DEFAULT_THUMBNAIL});
    }


}
