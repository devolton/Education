import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Post} from "./post.model";
import {PostTag} from "../../post-tag/model/post.tag.model";

interface CreatePostToTagAttr{
    postId:number;
    tagId:number;
}
@Table({tableName:'post_to_tag', createdAt:false, updatedAt:false})
export class PostToTag extends Model<PostToTag,CreatePostToTagAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @ForeignKey(()=>Post)
    @Column({type:DataType.INTEGER})
    postId:number;
    @ForeignKey(()=>PostTag)
    @Column({type:DataType.INTEGER})
    tagId:number;

}