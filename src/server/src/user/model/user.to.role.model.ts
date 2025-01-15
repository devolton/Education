import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";
import {Role} from "../../role/model/role.model";

interface CreateUserToRoleAttr{
    userId:number;
    roleId:number;
}
@Table({tableName:'user_to_role', updatedAt:false, createdAt:false})
export class UserToRole extends Model<UserToRole, CreateUserToRoleAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId:number;
    @ForeignKey(()=>Role)
    @Column({type:DataType.INTEGER})
    roleId:number;

}