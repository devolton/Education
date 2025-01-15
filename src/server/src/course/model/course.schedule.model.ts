import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {DaysOfWeek} from "../course.days.of.week.enum";
import {Course} from "./course.model";

interface CreateCourseScheduleAttr{
    dateOfStart:Date;
    dateOfEnd:Date;
    classStartTime:string;
    classEndTime:string;
    days:DaysOfWeek[];
}
@Table({tableName:'course_schedules'})
export class CourseSchedule extends Model<CourseSchedule,CreateCourseScheduleAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true,primaryKey:true})
    id:number;
    @Column({type:DataType.DATE, allowNull:false})
    dateOfStart:Date;
    @Column({type:DataType.DATE ,allowNull:false})
    dateOfEnd:Date;
    @Column({type:DataType.STRING(8), allowNull:false})
    classStartTime:string;
    @Column({type:DataType.STRING(8), allowNull:false})
    classEndTime:string;
    @Column({type:DataType.ARRAY(DataType.ENUM(...Object.values(DaysOfWeek))),allowNull:false, defaultValue:[DaysOfWeek.MONDAY,DaysOfWeek.WEDNESDAY, DaysOfWeek.FRIDAY]})
    days:DaysOfWeek[]

    @HasOne(()=>Course)
    course:Course;


}