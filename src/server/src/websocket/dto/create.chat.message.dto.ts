export class CreateChatMessageDto{
    id?: number;
    message:string;
    senderId?:number;
    receiverId:number;
    parentMessageId?:number;
}