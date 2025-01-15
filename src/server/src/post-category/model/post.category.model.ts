import {Model, Table, Column, DataType, BelongsToMany} from "sequelize-typescript";
import {unique} from "sequelize-typescript/dist/shared/array";
import {Post} from "../../post/model/post.model";
import {PostToCategory} from "../../post/model/post.to.category.model";

interface CreatePostCategoryAttr {
    name:string;
    description:string;
    thumbnailPath:string;
}

@Table({tableName: 'post_categories'})
export class PostCategory extends Model<PostCategory, CreatePostCategoryAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type:DataType.STRING(32), unique:true, allowNull:false})
    name:string;
    @Column({type:DataType.STRING(128), allowNull:false})
    description:string;
    @Column({type:DataType.STRING(256), allowNull:false})
    thumbnailPath:string;
    @BelongsToMany(()=>Post, ()=>PostToCategory)
    posts:Post[];

}