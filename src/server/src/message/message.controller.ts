import {Body, Post, Controller, Get, Query, Delete, Param, Put, UseGuards} from '@nestjs/common';
import {MessageService} from './message.service';

import {CreateMessageDto} from "./dto/create.message.dto";
import {Message} from "./model/message.model";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {
    }

    @Post()
    async createMessage(@Body('userMessage') messageDto: CreateMessageDto): Promise<Message> {
        return await this.messageService.createMessage(messageDto);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get()
    async getAllMessages(@Query('items_per_page') itemsPrePage: number,
                         @Query('page') page: number,
                         @Query('sort') sortField: string,
                         @Query('order') sortType: string,
                         @Query('search') search: string) {
        return await this.messageService.getMessages(page,itemsPrePage,sortField,sortType,search);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/:id')
    async getMessageById(@Param('id') id:number){
        return await this.messageService.getMessageById(id)
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/not-replied')
    async getNotRepliedMessages(@Query('limit') limit: number,
                                @Query('offset') offset: number): Promise<Message[]> {
        return await this.messageService.getNotRepliedMessages(limit, offset);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Put('/set-replied-status/:id')
    async updateMessage(@Param('id') messageId: number): Promise<void> {
        return await this.messageService.setRepliedStatus(messageId);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async deleteMessage(@Param('id') messageId: number): Promise<number> {
        return await this.messageService.removeMessage(messageId);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/replied')
    async deleteRepliedMessage(): Promise<number> {
        return await this.messageService.removeRepliedMessage();
    }
}
