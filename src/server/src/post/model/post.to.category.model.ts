import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Post} from "./post.model";
import {PostCategory} from "../../post-category/model/post.category.model";

interface CreatePostToCategoryAttr{
    postId:number;
    categoryId:number;
}

@Table({tableName:'post_to_category', createdAt:false, updatedAt:false})
export class PostToCategory extends Model<PostToCategory,CreatePostToCategoryAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @ForeignKey(()=>Post)
    @Column({type:DataType.INTEGER})
    postId:number;

    @ForeignKey(()=>PostCategory)
    @Column({type:DataType.INTEGER})
    categoryId:number;


}