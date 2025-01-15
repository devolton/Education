import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Comment} from './comment.model'
import {Course} from "../../course/model/course.model";

interface CreateCommentToCourseAttr{
    commentId:number;
    courseId:number;
}
@Table({tableName:'comment_to_course'})
export class CommentToCourse extends Model<CommentToCourse,CreateCommentToCourseAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number
    @ForeignKey(()=>Comment)
    @Column({type:DataType.INTEGER})
    commentId:number;
    @ForeignKey(()=>Course)
    @Column({type:DataType.INTEGER})
    courseId:number;


}