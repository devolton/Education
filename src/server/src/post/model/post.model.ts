import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {PostInfo} from "./post.info.model";
import {Author} from "../../author/model/author.mode";
import {PostToTag} from "./post.to.tag.model";
import {PostTag} from "../../post-tag/model/post.tag.model";
import {PostCategory} from "../../post-category/model/post.category.model";
import {PostToCategory} from "./post.to.category.model";
import {Comment} from '../../comment/model/comment.model';
import {CommentToPost} from "../../comment/model/comment.to.post.model";

interface CreatePostAttr {
    title: string;
    shortDescription: string;
    content: string;
    thumbnailPath: string;
    posterPath: string;
    imgAlt: string;
    slug: string;
    postInfoId: number;
    authorId: number;
    tags: string[];

}

@Table({tableName: 'posts'})
export class Post extends Model<Post, CreatePostAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING(128), allowNull: false})
    title: string;
    @Column({type: DataType.STRING(256), allowNull: false})
    shortDescription: string;
    @Column({type: DataType.STRING(2048), allowNull: false})
    content: string;
    @Column({type: DataType.STRING(256), allowNull: false})
    thumbnailPath: string;
    @Column({type: DataType.STRING(256), allowNull: false})
    posterPath: string;
    @Column({type: DataType.STRING(16), allowNull: false, defaultValue: 'post'})
    imgAlt: string;
    @Column({type: DataType.STRING(32), allowNull: false, unique: true})
    slug: string;


    @ForeignKey(() => PostInfo)
    @Column({type: DataType.INTEGER, allowNull: false})
    postInfoId: number;
    @BelongsTo(() => PostInfo)
    postInfo: PostInfo;
    @ForeignKey(() => Author)
    @Column({type: DataType.INTEGER, allowNull: false})
    authorId: number;
    @BelongsTo(() => Author)
    author: Author;
    @BelongsToMany(() => PostTag, () => PostToTag)
    tags: PostTag[];
    @BelongsToMany(() => PostCategory, () => PostToCategory)
    categories: PostCategory[];
    @BelongsToMany(() => Comment, () => CommentToPost)
    comments: Comment[];
}