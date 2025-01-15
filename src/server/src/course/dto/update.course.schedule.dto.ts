import {DaysOfWeek} from "../course.days.of.week.enum";

export class UpdateCourseScheduleDto {
    readonly dateOfStart: Date;
    readonly dateOfEnd: Date;
    readonly classStartTime: string;
    readonly classEndTime: string;
    readonly dayIds: Array<number>;
}