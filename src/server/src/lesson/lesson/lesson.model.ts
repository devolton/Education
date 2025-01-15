import {Model, Table, Column, DataType, BelongsToMany} from "sequelize-typescript";
import {Course} from "../../course/model/course.model";
import {CourseToLesson} from "../../course/model/course.to.lesson.model";

interface CreateLessonAttr{
    title:string,
    description:string;

}

@Table({tableName:'lessons', createdAt:false, updatedAt:false})
export class Lesson extends Model<Lesson,CreateLessonAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING, unique:true, allowNull:false})
    title:string;
    @Column({type:DataType.STRING, allowNull:false})
    description:string;
    @BelongsToMany(()=>Course,()=>CourseToLesson)
    courses:Course[];

}