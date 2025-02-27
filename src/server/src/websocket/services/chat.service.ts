import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ChatMessage} from "../model/chat.message.model";
import {CreateChatMessageDto} from "../dto/create.chat.message.dto";
import {UpdateChatMessageDto} from "../dto/update.chat.message.dto";
import {NotFoundException} from "../../exceptions/not.found.exception";
import {Op} from "sequelize";
import {User} from "../../user/model/user.model";
import {Sequelize} from "sequelize-typescript";

@Injectable()
export class ChatService {
    constructor(@InjectModel(ChatMessage) private readonly chatRepository: typeof ChatMessage) {
    }

    async getMessagesSpecificUserByUserId(senderId: number, receiverId: number, limit: number = 50, offset: number = 0): Promise<Array<ChatMessage>> {
        return (await this.chatRepository.findAll({
            where: {
                [Op.or]: [
                    {senderId, receiverId},
                    {senderId: receiverId, receiverId: senderId}
                ]
            },
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'sender',
                },
                {
                    model: User,
                    as: 'receiver'
                }
            ]
        })).reverse();


    }

    async createChatMessage(createChatMessageDto: CreateChatMessageDto) {
        let createdMessage = await this.chatRepository.create(createChatMessageDto);
        if (createdMessage) {
            return await this.chatRepository.findOne({
                where: {id: createdMessage.id},
                include: [
                    {
                        model: User,
                        as: 'sender',
                    },
                    {
                        model: User,
                        as: 'receiver'
                    }
                ]
            })
        }

    }

    async getLastReceiverMessage(senderId: number, receiverId: number): Promise<ChatMessage> {
        let receiverMessages: Array<ChatMessage> = await this.chatRepository.findAll({
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [
                            { receiverId: receiverId }, // где receiverId равен переданному значению
                            { senderId: senderId }        // и senderId равен переданному значению
                        ]
                    },
                    {
                        [Op.and]: [
                            { receiverId: senderId },     // или receiverId равен senderId
                            { senderId: receiverId }        // и senderId равен receiverId
                        ]
                    }
                ]

            },
            include: [
                {
                    model: User,
                    as: 'sender',
                },
                {
                    model: User,
                    as: 'receiver'
                }
            ],
            order: [['createdAt', 'ASC']],
        });
        if (receiverMessages.length > 0) {
            return receiverMessages[receiverMessages.length - 1];
        }
        return null;
    }

    async getUnreadMessagesCount(senderId: number, receiverId: number): Promise<number> {
        return await this.chatRepository.count({
            where: {
                senderId: receiverId,
                receiverId: senderId,
                isRead: false
            }
        })
    }



    async updateChatMessage(messageId: number, updateChatMessageDto: UpdateChatMessageDto): Promise<ChatMessage> {
        let messageForUpdate = await this.chatRepository.findOne({
            where: {
                id: messageId
            }
        });
        if (!messageForUpdate) {
            throw new NotFoundException("chatMessage", messageId);
        }
        return messageForUpdate.update(updateChatMessageDto);
    }
    async setChatMessageReadState(id:number):Promise<ChatMessage> {
        let messageForUpdate = await this.chatRepository.findOne({
            where:{
                id:id
            }}
        );
        if(!messageForUpdate) {
            throw new NotFoundException("chat_message",id);
        }
        return await messageForUpdate.update({
            isRead:true
        });
    }

    async removeMessageById(id: number) {
        return await this.chatRepository.destroy({where: {id: id}});
    }

    async removeMessagesByUserId(senderId: number) {
        return await this.chatRepository.destroy({
            where: {
                senderId: senderId
            }
        });
    }
}
