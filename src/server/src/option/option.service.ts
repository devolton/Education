import {Injectable} from '@nestjs/common';

import {Option} from './model/option.model';
import {InjectModel} from "@nestjs/sequelize";
import {CreateOptionDto} from "./dto/create.option.dto";
import {UpdateOptionDto} from "./dto/update.option.dto";
import {PaginationService} from "../pagination/pagination.service";
import {Op} from "sequelize";
import {NotFoundException} from "../exceptions/not.found.exception";

@Injectable()
export class OptionService {

    constructor(@InjectModel(Option) private optionRepository: typeof Option,
                private paginationService: PaginationService) {
    }

    async getOptionsByRelation(relation: string): Promise<Option[]> {
        return await this.optionRepository.findAll({where: {relation: relation}});

    }

    async getAllOptions(pageNum: number=1, itemsPerPage: number=5, sortField: string = "id", sortType: string = 'asc', search: string = '') {
        let optionsCount = await this.optionRepository.count();
        let pagination = await this.paginationService.createNavigation(pageNum, itemsPerPage, optionsCount);
        let limit = itemsPerPage;
        let offset = (pageNum - 1) * itemsPerPage;

        let options = await this.optionRepository.findAll({
                where: {
                    name:{[Op.iLike]: `${search}%`}
                },
            limit:limit,
            offset:offset,
            order: [[sortField, sortType.toUpperCase()]]
            }
        );
        return {data: options, payload: pagination};
    }

    async getOptionById(id: number): Promise<Option> {
        return await this.optionRepository.findByPk(id);
    }

    async getOptionByName(name: string): Promise<Option> {
        return await this.optionRepository.findOne({where: {name: name}})
    }

    async createOption(optionDto: CreateOptionDto): Promise<Option> {
        return await this.optionRepository.create(optionDto);
    }

    async updateOption(optionId: number, updateOptionDto: UpdateOptionDto): Promise<Option> {
        let optionForUpdate = await this.optionRepository.findByPk(optionId);
        if(!optionForUpdate)
            throw new NotFoundException("Option",optionId);
        return await optionForUpdate.update(updateOptionDto);

    }

    async removeOption(optionId): Promise<void> {
        let optionForRemove = await this.optionRepository.findByPk(optionId);
        if(!optionForRemove)
            throw new NotFoundException("Option",optionId);
        return await optionForRemove.destroy();
    }
}
