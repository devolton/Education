import {Model, Table, Column, DataType, ForeignKey} from "sequelize-typescript";
import {Comment} from '../model/comment.model'
import {Post} from "../../post/model/post.model";

interface CreateCommentToPostAttr{
    commentId:number;
    postId:number;
}

@Table({tableName:'comment_to_post'})
export class CommentToPost extends Model<CommentToPost,CreateCommentToPostAttr>{
    @Column({type:DataType.INTEGER,unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @ForeignKey(()=>Comment)
    @Column({type:DataType.INTEGER })
    commentId:number;
    @ForeignKey(()=>Post)
    @Column({type:DataType.INTEGER})
    postId:number;

}