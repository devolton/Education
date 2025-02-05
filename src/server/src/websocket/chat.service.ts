import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ChatMessage} from "./model/chat.message.model";
import {CreateChatMessageDto} from "./dto/create.chat.message.dto";
import {UpdateChatMessageDto} from "./dto/update.chat.message.dto";
import {NotFoundException} from "../exceptions/not.found.exception";

@Injectable()
export class ChatService {
    constructor(@InjectModel(ChatMessage) private readonly chatRepository:typeof ChatMessage){}

    async getMessagesSpecificUserByUserId(senderId:number,receiverId:number, limit:number=10,offset:number=0):Promise<Array<ChatMessage>>{
         return await this.chatRepository.findAll({
            where:{
                senderId:senderId,
                receiverId:receiverId
            },
            limit:limit,
            offset:offset,
            order:[['createdAt','DESC']]
        });


    }
    async createChatMessage(createChatMessageDto:CreateChatMessageDto){
        return await this.chatRepository.create(createChatMessageDto);
    }
    async updateChatMessage(messageId:number,updateChatMessageDto:UpdateChatMessageDto):Promise<ChatMessage>{
        let messageForUpdate=await this.chatRepository.findOne({where:{
            id:messageId
        }});
        if(!messageForUpdate){
            throw new NotFoundException("chatMessage",messageId);
        }
        return messageForUpdate.update(updateChatMessageDto);
    }
    async removeMessageById(id:number){
        return await this.chatRepository.destroy({where:{id:id}});
    }
    async removeMessagesByUserId(senderId:number){
        return await this.chatRepository.destroy({where:{
            senderId:senderId
        }});
    }
}
