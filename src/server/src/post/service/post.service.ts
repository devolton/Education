import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {PostInfo} from "../model/post.info.model";
import {Post} from "../model/post.model";
import {Author} from "../../author/model/author.mode";
import {Sequelize} from "sequelize-typescript";
import {CreatePostInfoDto} from "../dto/create.post.info.dto";
import {CreatePostDto} from "../dto/create.post.dto";
import {PostTag} from "../../post-tag/model/post.tag.model";
import {PostTagService} from "../../post-tag/post-tag.service";
import {PostToTag} from "../model/post.to.tag.model";
import {PostCategory} from "../../post-category/model/post.category.model";
import {Op} from "sequelize";
import {UpdatePostInfoDto} from "../dto/update.post.info.dto";
import {UpdatePostDto} from "../dto/update.post.dto";
import {PostToCategory} from "../model/post.to.category.model";
import {Comment} from '../../comment/model/comment.model';
import {User} from "../../user/model/user.model";
import {FilesService} from "../../files/files.service";
import {Config} from "../../Config";
import {PaginationService} from "../../pagination/pagination.service";
import {PostCategoryService} from "../../post-category/post-category.service";
import {NotFoundException} from "../../exceptions/not.found.exception";

@Injectable()
export class PostService {
    private _paginationPageCount: number = 0;

    constructor(@InjectModel(PostInfo) private postInfoRepository: typeof PostInfo,
                @InjectModel(Post) private postRepository: typeof Post,
                @InjectModel(PostToTag) private postToTagRepository: typeof PostToTag,
                @InjectModel(PostToCategory) private postToCategoryRepository: typeof PostToCategory,
                private categoryService:PostCategoryService,
                private postTagService: PostTagService,
                private filesService: FilesService,
                private paginationService: PaginationService,
                private sequelize: Sequelize) {
    }

    async getPostsAndPagination(page: number = 1, itemPerPage: number = 5, sortField: string = 'id', sortType: string = 'asc', query: string = '') {
        const count = await this.postRepository.count();
        const pagination = await this.paginationService.createNavigation(page, itemPerPage, count);
        const offset = (page - 1) * itemPerPage;
        let posts = await this.postRepository.findAll({
            where: {
                title: {[Op.iLike]: `${query}%`}
            },
            limit: itemPerPage,
            offset: offset,
            include: [
                {model: PostInfo},
                {model: Author},
                {model: PostCategory},
                {model: PostTag}
            ],
            order: [[sortField, sortType.toUpperCase()]],


        })
        return {data: posts, payload: pagination};

    }

    async getPosts(offset: number, limit: number, category: string, tag: string, query: string) {
        const whereCategory = category ? {name: category} : {};
        const whereTag = tag ? {name: tag} : {};
        if (query) {
            query = query.replace('%20', ' ');
            query = `%${query}%`
        } else {
            query = '%'
        }
        const totalCount = await this.postRepository.count({
            where: {
                title: {
                    [Op.iLike]: query
                }
            },
            include: [
                {model: PostCategory, where: whereCategory, attributes: []},
                {model: PostTag, where: whereTag, attributes: []}
            ],
            distinct: true
        });

        let postsCollection = await this.postRepository.findAll({
            where: {
                title: {
                    [Op.iLike]: query
                }
            },
            offset: offset,
            limit: limit,
            include: [
                {model: PostInfo},
                {model: Author},
                {
                    model: PostCategory,
                    where: whereCategory,
                    through: {attributes: []}
                },
                {
                    model: PostTag,
                    where: whereTag,
                    through: {attributes: []}
                }
            ]
        });
        if (!limit) {
            limit = 5;
        }

        this._paginationPageCount = Math.ceil(totalCount / limit);

        return {posts: postsCollection, pageCount: JSON.stringify(this._paginationPageCount)}
    }

    async getPostById(id: number) {
        return await this.postRepository.findByPk(id, {
            include: [
                {model: PostInfo},
                {model: Author},
                {model: PostTag},
                {model: PostCategory}
            ]
        });
    }


    async getRandomPosts(limit: number): Promise<Post[]> {
        return await this.postRepository.findAll({
            order: this.postRepository.sequelize.literal('RANDOM()'),
            limit: limit,
            include: [
                {model: PostInfo},
                {model: Author}
            ]
        })
    }

    async getTopViewsPosts(limit: number): Promise<Post[]> {
        return await this.postRepository.findAll({
            limit: limit,
            order: [[{model: PostInfo, as: 'postInfo'}, 'viewsCount', 'DESC']],
            include: [
                {
                    model: PostInfo,
                    as: 'postInfo',
                    attributes: ['viewsCount', 'dateOfPublished']
                }
            ]
        });

    }

    async getPostBySlug(slug: string): Promise<Post> {
        let post = await this.postRepository.findOne({
            where: {slug: slug},
            include: [
                {model: PostInfo},
                {model: Author},
                {model: PostTag},
                {model: PostCategory},
                {
                    model: Comment, include: [
                        {
                            model: User,
                            attributes: ['login', 'avatarPath']
                        }]
                }
            ]
        });
        let postInfo = await this.postInfoRepository.findByPk(post.postInfoId);
        if (postInfo) {
            let updatedViewsCount = postInfo.viewsCount + 1;
            await postInfo.update({viewsCount: updatedViewsCount});
        }

        return post;
    }


    async createPost(postInfoDto: CreatePostInfoDto, postDto: CreatePostDto): Promise<Post> {
        const transaction = await this.sequelize.transaction();
        try {
            const postInfo = await this.postInfoRepository.create(postInfoDto, {transaction});
            const post = await this.postRepository.create({
                ...postDto,
                postInfoId: postInfo.id
            }, {transaction});
            if (postDto.tagsIds) {
                for (let tagId of postDto.tagsIds) {
                    let tag = await this.postTagService.getTagById(tagId);
                    await post.$add('tags', tag.id,{transaction});

                }
            }
            if (postDto.categoriesIds) {
                for (let categoryId of postDto.categoriesIds) {
                    let category = await this.categoryService.getCategoryById(categoryId);
                    if(category)
                        await post.$add('categories', category.id,{transaction});

                }
            }
            const fullPost = await this.postRepository.findOne({
                where: {id: post.id},
                include: [{model: PostInfo}, {model: Author}, {model: PostTag}, {model: PostCategory}],
                transaction
            });
            await transaction.commit();
            return fullPost;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }

    }

    async updatePost(postId: number, updatePostDto: UpdatePostDto, updatePostInfoDto: UpdatePostInfoDto) {
        const post = await this.postRepository.findByPk(postId);
        if (!post)
            throw new NotFoundException("Post",postId);
        const postInfo = await this.postInfoRepository.findByPk(post.postInfoId);
        let transaction = await this.sequelize.transaction();
        try {
            await postInfo.update(updatePostInfoDto, {transaction});
            await post.update(updatePostDto, {transaction});
            if (updatePostDto.tagsIds) {
                await post.$set('tags', updatePostDto.tagsIds, { transaction });
            }
            if (updatePostDto.categoriesIds) {
                await post.$set('categories', updatePostDto.categoriesIds, { transaction });
            }
            await transaction.commit();
            return await this.postRepository.findOne({
                where: {id: post.id},
                include: [{model: PostInfo}, {model: Author}, {model: PostTag}, {model: PostCategory}]
            });

        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }


    async updateThumbnailOfPost(postId: number, thumbnail: Express.Multer.File): Promise<Post> {
        try {
            let post = await this.postRepository.findByPk(postId);
            if (!post) {
                throw new NotFoundException("Post",postId);
            }
            let thumbnailPath = await this.filesService.createFile(thumbnail, post.slug, Config.PATH.BLOG.POST.THUMBNAIL_FOLDER);
            return await post.update({thumbnailPath: thumbnailPath});
        } catch (ex) {
            console.log(ex);
            throw new HttpException('File loading error!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePosterOfPost(postId: number, poster: Express.Multer.File): Promise<Post> {
        try {
            let post = await this.postRepository.findByPk(postId);
            if (!post) {
                throw new NotFoundException("Post",postId);
            }
            let posterPath = await this.filesService.createFile(poster, post.slug, Config.PATH.BLOG.POST.POSTER_FOLDER);
            return await post.update({posterPath: posterPath});
        } catch (ex) {
            console.log(ex);
            throw new HttpException('File loading error!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async removeThumbnailOfPost(postId: number) {
        let post = await this.postRepository.findByPk(postId);
        if (!post)
            throw new NotFoundException("Post",postId);
        if (post.thumbnailPath === Config.PATH.BLOG.POST.DEFAULT_THUMBNAIL) {
            return;
        }
        await this.filesService.removeFile(post.thumbnailPath);
        return await post.update({thumbnailPath: Config.PATH.BLOG.POST.DEFAULT_THUMBNAIL});
    }

    async removePosterOfPost(postId: number) {
        let post = await this.postRepository.findByPk(postId);
        if (!post) {
            throw new NotFoundException("Post",postId);
        }
        if (post.posterPath === Config.PATH.BLOG.POST.DEFAULT_POSTER)
            return;
        await this.filesService.removeFile(post.posterPath);
        return await post.update({posterPath: Config.PATH.BLOG.POST.DEFAULT_POSTER});
    }

    async removePost(postId: number) {
        let post = await this.postRepository.findByPk(postId);
        if (!post)
            throw new NotFoundException("Post",postId);
        let transaction = await this.sequelize.transaction();
        try {
            await this.postInfoRepository.destroy({
                where: {id: post.postInfoId}
            });
            await this.postToTagRepository.destroy({
                where: {postId: post.id}
            })
            if (post.thumbnailPath !== Config.PATH.BLOG.POST.DEFAULT_THUMBNAIL) {
                await this.removeThumbnailOfPost(post.id);
            }
            if (post.posterPath !== Config.PATH.BLOG.POST.DEFAULT_POSTER) {
                await this.removePosterOfPost(post.id);
            }
            await this.postToCategoryRepository.destroy({
                where: {postId: post.id}
            })
            await post.destroy();
            await transaction.commit();
        } catch (e) {
            await transaction.rollback()
            throw e;
        }
    }

    async getNeighbourSlugsPair(currentSlug: string): Promise<Post[]> {
        let postsCollection: Post[] = await this.postRepository.findAll();
        let currentIndex: number = postsCollection.findIndex((post: Post) => post.slug === currentSlug);
        if (currentIndex == -1) {
            return null;
        }
        let postsPair: Post[] = [];
        if (currentIndex === 0) {
            postsPair.push(postsCollection[postsCollection.length - 1]);
            postsPair.push(postsCollection[++currentIndex]);
        } else if (currentIndex === postsCollection.length - 1) {
            postsPair.push(postsCollection[--currentIndex]);
            postsPair.push(postsCollection[0]);
        } else {
            postsPair.push(postsCollection[currentIndex - 1]);
            postsPair.push(postsCollection[currentIndex + 1]);
        }
        return postsPair;
    }
}
