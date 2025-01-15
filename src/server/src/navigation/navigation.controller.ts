import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {NavigationService} from './service/navigation.service';
import {Navigation} from "./model/navigation.model";
import {CreateNavigationDto} from "./dto/create.navigation.dto";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";
import {UpdateNavigationDto} from "./dto/update.navigation.dto";


@Controller('/navigations')
export class NavigationController {
    constructor(private readonly navigationService: NavigationService) {
    }

    @Get()
    async getNavigations(): Promise<Navigation[]> {
        return await this.navigationService.getNavigations();
    }

    // @Roles('admin')
    // @UseGuards(RoleGuard)
    @Get('/admin')
    async getNavigationsAndPagination(@Query('items_per_page') itemsPrePage: number,
                                      @Query('page') page: number,
                                      @Query('sort') sortField: string,
                                      @Query('order') sortType: string,
                                      @Query('search') search: string) {
        return await this.navigationService.getNavigationForAdmin(page, itemsPrePage, sortField, sortType, search);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/:id')
    async getNavigationById(@Param('id') id: number): Promise<Navigation> {
        return await this.navigationService.getNavigationById(id);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post()
    async createNavigation(@Body('navigation') createNavigationDto: CreateNavigationDto): Promise<Navigation> {
        return await this.navigationService.createNavigation(createNavigationDto);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Put('/:id')
    async updateNavigation(@Param('id') id: number,
                           @Body('navigation') updateNavigationDto: UpdateNavigationDto): Promise<Navigation> {
        return await this.navigationService.updateNavigation(id, updateNavigationDto);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeNavigation(@Param('id') id: number) {
        return await this.navigationService.removeNavigationById(id);
    }

}
