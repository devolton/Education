import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors} from "@nestjs/common";
import {ChatService} from "./chat.service";
import {AddUserIdInterceptor} from "../interceptors/add.user.id.interceptor";
import {JwtAuthGuard} from "../token/guard/jwt.auth.guard";
import {Request} from "express";
import {CreateChatMessageDto} from "./dto/create.chat.message.dto";
import {ChatMessage} from "./model/chat.message.model";
import {UpdateChatMessageDto} from "./dto/update.chat.message.dto";


@Controller('chats')
export class ChatController {
    constructor(private readonly chatService: ChatService) {
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AddUserIdInterceptor)
    @Get('/:id')
    async getById(@Param('id') receiverId: number,
                  @Req() req: Request,
                  @Query('limit') limit: number,
                  @Query('offset') offset: number,) {

        let senderId = req.body.userId;
        return await this.chatService.getMessagesSpecificUserByUserId(senderId, receiverId, limit, offset)
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AddUserIdInterceptor)
    @Get('/last/:id')
    async getReceiverLastMessage(@Req() req: Request,
                                 @Param('id') receiverId: number): Promise<ChatMessage> {
        let senderId = req.body.userId;
        return await this.chatService.getLastReceiverMessage(senderId, receiverId);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(AddUserIdInterceptor)
    @Get('/unread/:id')
    async getUnreadMessageCount(@Req() req: Request,
                                @Param('id') receiverId: number): Promise<number> {
        let senderId = req.body.userId;
        return await this.chatService.getUnreadMessagesCount(senderId,receiverId);
    }



    @UseInterceptors(AddUserIdInterceptor)
    @Post()
    async createChatMessage(@Req() req: Request,
                            @Body('message') createMessageDto: CreateChatMessageDto): Promise<ChatMessage> {

        createMessageDto.senderId = req.body.userId;
        return await this.chatService.createChatMessage(createMessageDto);
    }

    @Put("/:id")
    async updateMessage(@Param('id') id: number,
                        @Body('message') updateMessageDto: UpdateChatMessageDto): Promise<ChatMessage> {
        return await this.chatService.updateChatMessage(id, updateMessageDto);
    }

    @Delete(`/:id`)
    async deleteMessage(@Param('id') id: number): Promise<number> {
        return await this.chatService.removeMessageById(id);
    }

    @Delete('/sender/:id')
    async deleteUsersMessages(@Param('id') id: number): Promise<number> {
        return this.chatService.removeMessagesByUserId(id);
    }


}