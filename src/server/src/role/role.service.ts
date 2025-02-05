import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./model/role.model";
import {CreateRoleDto} from "./dto/create.role.dto";
import {UpdateRoleDto} from "./dto/update.role.dto";
import {Sequelize} from "sequelize-typescript";
import {UserToRole} from "../user/model/user.to.role.model";
import {PaginationService} from "../pagination/pagination.service";
import {Op} from "sequelize";


@Injectable()
export class RoleService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role,
                @InjectModel(UserToRole) private userToRoleRepository: typeof UserToRole,
                private paginationService:PaginationService,
                private sequelize: Sequelize) {
    }

    async getRoleById(id: number): Promise<Role> {
        return await this.roleRepository.findByPk(id);
    }

    async getRoleByValue(roleValue: string): Promise<Role> {
        return await this.roleRepository.findOne({where: {value: roleValue}});
    }

    async getAllRoles(page:number=1,itemRerPage:number=5,sortField:string='id', sortType:string='asc',search='') {
        let count = await this.roleRepository.count();
        let pagination=await this.paginationService.createNavigation(page,itemRerPage,count);
        let offset = (page-1) * itemRerPage;
        let roles= await this.roleRepository.findAll({
            where:{
                value:{[Op.iLike]:`${search}%`}
            },
            limit:itemRerPage,
            offset:offset,
            order:[[sortField,sortType.toUpperCase()]]
        })
        return {data:roles,payload:pagination}
    }

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        return await this.roleRepository.create(createRoleDto);
    }

    async updateRole(roleId: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
        await this.roleRepository.update(updateRoleDto, {where: {id: roleId}});
        return await this.roleRepository.findByPk(roleId);
    }

     async removeRole(roleId: number): Promise<number> {
        let transaction = await this.sequelize.transaction();
        try {
            await this.userToRoleRepository.destroy({where:{id:roleId}});
            let delRowsCount= await this.roleRepository.destroy({where: {id: roleId}});
            await transaction.commit();
            return delRowsCount;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }

    }


}
