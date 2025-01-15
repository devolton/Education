import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {OptionService} from './option.service';
import {Option} from "./model/option.model";
import {CreateOptionDto} from "./dto/create.option.dto";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";
import {UpdateOptionDto} from "./dto/update.option.dto";

@Controller('options')
export class OptionController {
    constructor(private readonly optionService: OptionService) {
    }

    @Get()
    async getAllOptions(@Query('items_per_page') itemsPrePage:number,
                        @Query('page')page:number,
                        @Query('sort') sortField:string,
                        @Query('order') sortType:string,
                        @Query('search') search:string){
        return await this.optionService.getAllOptions(page,itemsPrePage,sortField,sortType,search);
    }
    @Get('/:id')
    async geOptionById(@Param('id') id:number):Promise<Option>{
        return await this.optionService.getOptionById(id);
    }

    @Get('/relation/:relation')
    async getOptions(@Param('relation') relation: string): Promise<Option[]> {
        return await this.optionService.getOptionsByRelation(relation);
    }

    @Get('/name/:name')
    async getOptionByName(@Param('name') name: string): Promise<Option> {
        return await this.optionService.getOptionByName(name);
    }

    // @Roles('admin')
    // @UseGuards(RoleGuard)
    @Post()
    async createOption(@Body('option') optionDto: CreateOptionDto): Promise<Option> {
        return await this.optionService.createOption(optionDto);
    }
    // @Roles('admin')
    // @UseGuards(RoleGuard)
    @Put('/:id')
    async updateOption(@Param('id') optionId:number,
                       @Body('option') updateOptionDto:UpdateOptionDto):Promise<Option> {
        return await this.optionService.updateOption(optionId,updateOptionDto);
    }
    // @Roles('admin')
    // @UseGuards(RoleGuard)
    @Delete('/:id')
    async deleteOption(@Param('id') optionId:number):Promise<void>{
        return await this.optionService.removeOption(optionId);
    }


}
