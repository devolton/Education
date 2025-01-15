import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Post} from "../../post/model/post.model";
import {PostToTag} from "../../post/model/post.to.tag.model";
interface CreatePostTagAttr{
    name:string;
}

@Table({tableName:'post_tags'})
export class PostTag extends Model<PostTag,CreatePostTagAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING(16), unique:true, allowNull:false })
    name:string;
    @BelongsToMany(()=>Post,()=>PostToTag)
    posts:Post[];

}