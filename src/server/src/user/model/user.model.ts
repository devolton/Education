import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Review} from "../../review/model/review.model";
import {Role} from "../../role/model/role.model";
import {UserToRole} from "./user.to.role.model";
import {ApiProperty} from "@nestjs/swagger";
import {Comment} from "../../comment/model/comment.model";
import {ChatMessage} from "../../websocket/model/chat.message.model";

interface UserCreateAttr{
    name:string;
    surname:string;
    middleName:string;
    email:string;
    login:string;
    avatarPath:string;
    password:string;
}

@Table({tableName:'users'})
export class User extends Model<User,UserCreateAttr> {
    @ApiProperty({example:1, description:'Unique identifier'})
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @ApiProperty({example:'Anton', description:'Name of user'})
    @Column({type:DataType.STRING,allowNull:false})
    name:string;
    @ApiProperty({example:'Bolton', description:'Surname of user'})
    @Column({type:DataType.STRING, allowNull:false})
    surname:string;
    @ApiProperty({example:'Andreevich', description:'Middle name of user'})
    @Column({type:DataType.STRING, allowNull:false})
    middleName:string;
    @ApiProperty({example:'vol.ant_', description:'Login  of user'})
    @Column({type:DataType.STRING, unique:true, allowNull:false,validate:{len:[2,32]}})
    login:string;
    @ApiProperty({example:'bolton.01@gmail.com', description:'Email of user'})
    @Column({type:DataType.STRING, unique:true, allowNull:false})
    email:string;
    @ApiProperty({example:'Password_123', description:'Password of user'})
    @Column({type:DataType.STRING,unique:false, allowNull:false})
    password:string;
    @ApiProperty({example:'/static/users/userAvatar.png', description:'Path of users avatar'})
    @Column({type:DataType.STRING, allowNull:true})
    avatarPath:string;
    @HasMany(()=>Review)
    reviews:Review[]
    @BelongsToMany(()=>Role,()=>UserToRole)
    roles:Role[];
    @HasMany(()=>Comment)
    comments:Comment[];
    @HasMany(() => ChatMessage, { foreignKey: 'senderId', as: 'sentMessages' })
    sentMessages: ChatMessage[];

    @HasMany(() => ChatMessage, { foreignKey: 'receiverId', as: 'receivedMessages' })
    receivedMessages: ChatMessage[];






}