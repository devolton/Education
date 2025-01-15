import {DaysOfWeek} from "../course.days.of.week.enum";

export class CreateCourseScheduleDto{
    readonly dateOfStart:Date;
    readonly dateOfEnd:Date;
    readonly classStartTime:string;
    readonly classEndTime:string;
    readonly dayIds:Array<number>

}