import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../user/model/user.model";
interface CreateTokenAttr{
    refreshToken:string,
    userId:number

}

@Table({tableName:'tokens'})
export class Token extends Model<Token, CreateTokenAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING(2048),unique:true,allowNull:true})
    refreshToken:string;
    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId;

}