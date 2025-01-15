import {Column, DataType, Model, Table} from "sequelize-typescript";

interface CreateMessageAttr{
    name:string;
    email:string;
    message:string;
}
@Table({tableName:'messages'})
export class Message extends Model<Message,CreateMessageAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING(64),allowNull:false })
    name:string;
    @Column({type:DataType.STRING(128), allowNull:false})
    email:string;
    @Column({type:DataType.STRING, allowNull:false})
    message:string;
    @Column({type:DataType.BOOLEAN, allowNull:false, defaultValue:false})
    isReplied:boolean;

}