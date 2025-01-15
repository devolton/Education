import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Course} from "./course.model";
import {Lesson} from "../../lesson/lesson/lesson.model";


interface CreateCourseToLessonAttr{
    courseId:number;
    lessonId:number;
}
@Table({tableName:'course_to_lesson', createdAt:false, updatedAt:false})
export class CourseToLesson extends Model<CourseToLesson,CreateCourseToLessonAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @ForeignKey(()=>Course)
    @Column({type:DataType.INTEGER})
    courseId:number;


    @ForeignKey(()=>Lesson)
    @Column({type:DataType.INTEGER})
    lessonId:number;


}