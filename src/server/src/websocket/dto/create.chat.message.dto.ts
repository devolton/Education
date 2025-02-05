export class CreateChatMessageDto{
    message:string;
    senderId?:number;
    receiverId:number;
    parentMessageId?:number;
}