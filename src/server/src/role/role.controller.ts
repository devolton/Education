import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put} from '@nestjs/common';
import {RoleService} from './role.service';
import {Role} from "./model/role.model";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";
import {UpdateRoleDto} from "./dto/update.role.dto";
import {CreateRoleDto} from "./dto/create.role.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get()
    async getAllRoles(@Query('items_per_page') itemsPrePage: number,
                      @Query('page') page: number,
                      @Query('sort') sortField: string,
                      @Query('order') sortType: string,
                      @Query('search') search: string) {
        return await this.roleService.getAllRoles(page,itemsPrePage,sortField,sortType,search);

    }
    @Get('/:id')
    async getRoleById(@Param('id')id:number){
        return await this.roleService.getRoleById(id);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Put('/:id')
    async updateRole(@Param('id') roleId: number,
                     @Body('role') updateRoleDto: UpdateRoleDto): Promise<Role> {
        return await this.roleService.updateRole(roleId, updateRoleDto);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post()
    async createRole(@Body('role') createRoleDto: CreateRoleDto): Promise<Role> {
        return await this.roleService.createRole(createRoleDto);
    }


    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async deleteRole(@Param('id') roleId: number): Promise<number> {
        return await this.roleService.removeRole(roleId);
    }


}
