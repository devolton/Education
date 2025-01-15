import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {PostStatusEnum} from "../post.status.enum";
import {Post} from "./post.model";

interface CreatePostInfoAttr{
    viewsCount:number;
    status:PostStatusEnum;
    dateOfCreated:Date;
    dateOfPublished:Date;
}
@Table({tableName:'post_info'})
export class PostInfo extends Model<PostInfo, CreatePostInfoAttr>{
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;
    @Column({type:DataType.INTEGER, allowNull:false, defaultValue:0})
    viewsCount:number;
    @Column({type:DataType.ENUM(...Object.values(PostStatusEnum)), allowNull:false, defaultValue: PostStatusEnum.CREATED})
    status:PostStatusEnum;
    @Column({type:DataType.DATE, allowNull:false})
    dateOfCreated:Date;
    @Column({type:DataType.DATE, allowNull:true})
    dateOfPublished:Date;

    @HasOne(()=>Post)
    post:Post;

}