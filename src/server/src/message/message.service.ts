import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Message} from "./model/message.model";
import {CreateMessageDto} from "./dto/create.message.dto";
import {PaginationService} from "../pagination/pagination.service";
import {Op} from "sequelize";

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message) private messageRepository: typeof Message,
                private paginationService: PaginationService) {
    }

    async createMessage(messageDto: CreateMessageDto): Promise<Message> {
        return await this.messageRepository.create(messageDto);
    }

    async getMessages(page: number = 1, itemsPerPage: number = 5, sortField: string = 'id', sortType: string = 'asc', search: string = '') {
        let count = await this.messageRepository.count({
            where:{
                email:{[Op.iLike]:`${search}%`}
            }
        });
        let offset=(page-1) * itemsPerPage;
        let pagination = await this.paginationService.createNavigation(page, itemsPerPage, count);
        let messages = await this.messageRepository.findAll({
            where:{
                email:{[Op.iLike]:`${search}%`}
            },
            offset:offset,
            limit:itemsPerPage,
            order:[[sortField,sortType.toUpperCase()]]
        });
        return {data:messages,payload:pagination};



    }
    async getMessageById(id:number) {
        return await this.messageRepository.findByPk(id);
    }


    async getNotRepliedMessages(limit, offset): Promise<Message[]> {
        return await this.messageRepository.findAll({
            where: {isReplied: false},
            limit: limit,
            offset: offset
        })
    }

    async removeMessage(messageId: number): Promise<number> {
        return await this.messageRepository.destroy({where: {id: messageId}});
    }

    async removeRepliedMessage(): Promise<number> {
        return await this.messageRepository.destroy({where: {isReplied: true}});
    }

    async setRepliedStatus(messageId: number): Promise<void> {
        let message = await this.messageRepository.findByPk(messageId);
        await message.update({isReplied: true});
    }


}
