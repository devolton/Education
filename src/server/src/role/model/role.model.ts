import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../../user/model/user.model";
import {UserToRole} from "../../user/model/user.to.role.model";

interface CreateRoleAttr{
    value:string;
    description:string;
}

@Table({tableName:'roles'})
export class Role extends Model<Role,CreateRoleAttr>{
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING(32), unique:true,allowNull:true})
    value:string;
    @Column({type:DataType.STRING(256)})
    description:string;
    @BelongsToMany(()=>User,()=>UserToRole)
    users:User[]

}