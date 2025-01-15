import {ID} from "../../../../../../_metronic/helpers";
import {Lesson} from "../../../lesson/lesson-list/core/_lesson.model.ts";
import {Config} from "../../../../../../env.config.ts";

export enum DaysOfWeek{
    MONDAY='monday',
    TUESDAY='tuesday',
    WEDNESDAY='wednesday',
    THURSDAY='thursday',
    FRIDAY='friday',
    SATURDAY='saturday',
    SUNDAY='sunday'

}

export type Course = {
    id:ID,
    title:string,
    shortDescription:string,
    fullDescription:string,
    thumbnailPath:string,
    posterPath:string,
    slug:string,
    price:number,
    courseScheduleId:ID,
    courseSchedule:CourseSchedule,
    lessons?:Array<Lesson>

}

export type CourseSchedule={
    id:ID,
    dateOfStart:Date,
    dateOfEnd:Date,
    classStartTime:string,
    classEndTime:string,
    days:Array<DaysOfWeek>

}
export type UpdateCourseDto={
    title:string,
    shortDescription:string,
    fullDescription:string,
    price:number,
    slug:string
}
export type CreateCourseDto={
    title:string,
    shortDescription:string,
    fullDescription:string,
    thumbnailPath:string,
    posterPath:string,
    price:number,
    slug:string
}
export type CreateCourseScheduleDto={
    dateOfStart:Date,
    dateOfEnd:Date,
    classStartTime:string,
    classEndTime:string,
    dayIds:Array<number>
}

export type UpdateCourseScheduleDto={
    dateOfStart:Date,
    dateOfEnd:Date,
    classStartTime:string,
    classEndTime:string,
    dayIds:Array<number>
}

export const initialCourseSchedule:CourseSchedule ={
    id:undefined,
    dateOfStart: new Date(),
    dateOfEnd:new Date(),
    classStartTime:'18:10',
    classEndTime:'21:10',
    days: [DaysOfWeek.MONDAY,DaysOfWeek.THURSDAY,DaysOfWeek.FRIDAY]
}

export const initialCourse:Course={
    id:undefined,
    title:'Devolton trip',
    shortDescription:'Devolton course',
    fullDescription:'Devolton course',
    thumbnailPath:Config.PATH.ASSETS.COURSE.DEFAULT_THUMBNAIL,
    posterPath:Config.PATH.ASSETS.COURSE.DEFAULT_POSTER,
    slug:'course',
    price:20,
    courseSchedule:{...initialCourseSchedule},
    courseScheduleId:undefined,
    lessons:null
}