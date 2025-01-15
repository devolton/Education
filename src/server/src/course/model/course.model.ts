
import {Model, Table, Column, DataType, ForeignKey, BelongsTo, BelongsToMany, HasMany} from "sequelize-typescript";
import {CourseSchedule} from "./course.schedule.model";
import {Lesson} from "../../lesson/lesson/lesson.model";
import {CourseToLesson} from "./course.to.lesson.model";
import {Review} from "../../review/model/review.model";
import {Comment} from '../../comment/model/comment.model'
import {CommentToCourse} from "../../comment/model/comment.to.course.model";
interface CreateCourseAttr{
    title:string;
    shortDescription:string;
    fullDescription:string;
    price:number;
    thumbnailPath:string;
    posterPath:string;
    slug:string;
    courseScheduleId:number;

}

@Table({tableName:'courses'})
export  class Course extends Model<Course,CreateCourseAttr>{
    @Column({type:DataType.INTEGER, unique:true,autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING(128), allowNull:false})
    title:string;
    @Column({type:DataType.STRING(256), allowNull:false})
    shortDescription:string;
    @Column({type:DataType.STRING(2048), allowNull:false})
    fullDescription:string;
    @Column({type:DataType.DOUBLE, allowNull:true})
    price:number;
    @Column({type:DataType.STRING(512),allowNull:false})
    thumbnailPath:string;
    @Column({type:DataType.STRING(512), allowNull:false})
    posterPath:string;
    @Column({type:DataType.STRING(32), allowNull:false, unique:true})
    slug:string;

    @ForeignKey(()=>CourseSchedule)
    @Column({type:DataType.INTEGER, allowNull:false})
    courseScheduleId:number;

    @BelongsTo(()=>CourseSchedule)
    courseSchedule:CourseSchedule;

    @BelongsToMany(()=>Lesson, ()=>CourseToLesson)
    lessons:Lesson[];

    @HasMany(()=>Review)
    reviews:Review[];
    @BelongsToMany(()=>Comment,()=>CommentToCourse)
    comments:Comment;

}