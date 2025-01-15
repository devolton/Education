import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../user/model/user.model";

interface CreateCommentAttr {
    comment: string;
    userId: number;
    parentId: number;
}


@Table({tableName:'comment'})
export class Comment extends Model<Comment, CreateCommentAttr> {
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true })
    id:number;
    @Column({type:DataType.STRING, allowNull:false})
    comment:string;
    @ForeignKey(()=>Comment)
    @Column({type:DataType.INTEGER, allowNull:true})
    parentId:number;
    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER, allowNull:false})
    userId:number;
    @BelongsTo(()=>User)
    user:User;

}