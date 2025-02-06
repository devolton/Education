import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ChatMessage} from "./model/chat.message.model";
import {CreateChatMessageDto} from "./dto/create.chat.message.dto";
import {UpdateChatMessageDto} from "./dto/update.chat.message.dto";
import {NotFoundException} from "../exceptions/not.found.exception";
import {Op} from "sequelize";
import {User} from "../user/model/user.model";

@Injectable()
export class ChatService {
    constructor(@InjectModel(ChatMessage) private readonly chatRepository:typeof ChatMessage){}

    async getMessagesSpecificUserByUserId(senderId:number,receiverId:number, limit:number=100,offset:number=0):Promise<Array<ChatMessage>>{
         return await this.chatRepository.findAll({
             where: {
                 [Op.or]: [
                     { senderId, receiverId },
                     { senderId: receiverId, receiverId: senderId }
                 ]
             },
            limit:limit,
            offset:offset,
            order:[['createdAt','ASC']],
             include:[
                 {
                     model: User,
                     as: 'sender',
                 },
                 {
                     model: User,
                     as: 'receiver'
                 }
                 ]
        });


    }
    async createChatMessage(createChatMessageDto:CreateChatMessageDto){
        let createdMessage= await this.chatRepository.create(createChatMessageDto);
        if(createdMessage){
            return await this.chatRepository.findOne({where: {id:createdMessage.id},
                include:[
                    {
                        model: User,
                        as: 'sender',
                    },
                    {
                        model: User,
                        as: 'receiver'
                    }
                ]})
        }
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
