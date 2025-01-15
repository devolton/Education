import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Navigation} from "../model/navigation.model";
import {CreateNavigationDto} from "../dto/create.navigation.dto";
import {UpdateNavigationDto} from "../dto/update.navigation.dto";
import {PaginationService} from "../../pagination/pagination.service";
import {Op} from "sequelize";
import {NotFoundException} from "../../exceptions/not.found.exception";

@Injectable()
export class NavigationService {
    constructor(@InjectModel(Navigation) private navigationRepository: typeof Navigation,
                private paginationService: PaginationService) {}

    async getNavigations():Promise<Navigation[]>{
        return await this.navigationRepository.findAll({order:[['order','ASC']]});
    }
    async getNavigationForAdmin(page:number=1, itemPerPage:number =5,sortField:string='id', sortType:string='asc', search:string=''){
        let count = await this.navigationRepository.count();
        let offset = (page-1) * itemPerPage;
        let pagination = await this.paginationService.createNavigation(page,itemPerPage,count);
        let navigations= await this.navigationRepository.findAll({
            where:{
                title:{[Op.iLike]:`${search}%`}
            },
            limit:itemPerPage,
            offset:offset,
            order:[[sortField,sortType.toUpperCase()]]

        })

        return {data:navigations,payload:pagination}
    }
    async getNavigationById(id:number) :Promise<Navigation>{
        return await this.navigationRepository.findByPk(id);
    }
    async createNavigation(createNavigationDto:CreateNavigationDto):Promise<Navigation>{
        return await this.navigationRepository.create(createNavigationDto);

    }
    async updateNavigation(id:number, updateNavigationDto:UpdateNavigationDto):Promise<Navigation>{
        let navForUpdate = await this.navigationRepository.findByPk(id);
        if(!navForUpdate){
            throw new NotFoundException("Navigation", id);
        }
        if(updateNavigationDto.parentId!==null){
            let parentNode = await this.navigationRepository.findByPk(updateNavigationDto.parentId);
            if(!parentNode)
                throw new HttpException('Invalid parent id', HttpStatus.BAD_REQUEST);
        }
        return await navForUpdate.update(updateNavigationDto);

    }
    async removeNavigationById(id:number){
        let navForRemove = await this.navigationRepository.findByPk(id);
        if(!navForRemove){
           throw new NotFoundException("Navigation",id);
        }
        return navForRemove.destroy();
    }
}
