import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Author} from "./model/author.mode";
import {CreateAuthorDto} from "./dto/create.author.dto";
import {UpdateAuthorDto} from "./dto/update.author.dto";
import {Op} from "sequelize";
import {PaginationService} from "../pagination/pagination.service";
import {FilesService} from "../files/files.service";
import {Config} from "../Config";
import {AuthorPositionEnum} from "./author.position.enum";
import {NotFoundException} from "../exceptions/not.found.exception";

@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author) private authorRepository: typeof Author,
                private paginationService:PaginationService,
                private fileService:FilesService) {
    }

    async createAuthor(authorDto: CreateAuthorDto,avatar:Express.Multer.File=null): Promise<Author> {
        const daysValues:Array<AuthorPositionEnum> = Object.values(AuthorPositionEnum) as Array<AuthorPositionEnum>;
        let createdAuthorPosition = daysValues[authorDto.positionIndex];
        let createdAuthor= await this.authorRepository.create({...authorDto,position:createdAuthorPosition});
        if(!createdAuthor)
            throw new HttpException('Invalid create author operation!', HttpStatus.INTERNAL_SERVER_ERROR);
        if(avatar){
            let updatedPath = await this.fileService.createFile(avatar,String(createdAuthor.id),Config.PATH.BLOG.AUTHOR.AVATAR_FOLDER);
            if(updatedPath){
                return await createdAuthor.update({avatarPath:updatedPath})
            }
        }
        return createdAuthor;
    }

    async getAuthorById(id: number): Promise<Author> {
        return await this.authorRepository.findOne({where: {id: id}});
    }

    async getAuthorsAndPagination(page:number =1, itemsPerPage:number=5, sortField:string='id', sortType:string='asc',search:string=''){
        let count = await this.authorRepository.count({
            where:{
                fullName:{[Op.iLike]:`${search}%`}
            }
        })
        let pagination = await this.paginationService.createNavigation(page,itemsPerPage,count);
        let offset = (page-1)*itemsPerPage;
        let authors = await this.authorRepository.findAll({
            where:{
                fullName:{[Op.iLike]: `${search}%`}
            },
            offset:offset,
            limit:itemsPerPage,
            order:[[sortField,sortType.toUpperCase()]]
        });
        return {data:authors,payload:pagination}
    }

    async updateAuthor(authorId: number, updateAuthorDto: UpdateAuthorDto) {
        let author = await this.authorRepository.findByPk(authorId);
        if(!author)
            throw new NotFoundException('Author',authorId);
        const daysValues:Array<AuthorPositionEnum> = Object.values(AuthorPositionEnum) as Array<AuthorPositionEnum>;
        let updatePosition = daysValues[updateAuthorDto.positionIndex];
         return await author.update({...updateAuthorDto,position:updatePosition})

    }
    async updateAvatar(id:number,avatar:Express.Multer.File){
        let author = await this.authorRepository.findByPk(id);
        if(!author)
            throw new NotFoundException('Author',id);
        let updatedPath = await this.fileService.createFile(avatar,String(id),Config.PATH.BLOG.AUTHOR.AVATAR_FOLDER);
        return await author.update({avatarPath:updatedPath});
    }

    async removeAuthor(authorId: number) {
        let authorForRemove = await this.authorRepository.findByPk(authorId);
        if(!authorForRemove)
            throw new NotFoundException('Author', authorId);
        return authorForRemove.destroy();
    }
    async removeAvatar(id:number){
        let author= await this.authorRepository.findByPk(id);
        if(!author)
           throw new NotFoundException("Author", id);
        if(author.avatarPath===Config.PATH.BLOG.AUTHOR.DEFAULT_AVATAR)
            return;
        await this.fileService.removeFile(author.avatarPath);
        return await author.update({avatarPath:Config.PATH.BLOG.AUTHOR.DEFAULT_AVATAR});
    }
}
