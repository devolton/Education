import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../user/model/user.model";
interface CreateChatMessageAttr{
    message:string,
    senderId:number,
    receiverId:number,
    parentId:number,

}

@Table({tableName:"chat_messages"})
export class ChatMessage  extends Model<ChatMessage,CreateChatMessageAttr>{
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;
    @Column({type:DataType.STRING(5096),allowNull:false})
    message:string;

    @Column({type:DataType.BOOLEAN,allowNull:false,defaultValue:false})
    isRead:boolean;

    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER,allowNull:false})
    senderId:number;
    @BelongsTo(()=>User)
    sender:User;

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER,allowNull:false})
    receiverId:number;
    @BelongsTo(() => User)
    receiver:User;
    @Column({type:DataType.INTEGER,allowNull:true,defaultValue:null})
    parentMessageId:number;

}