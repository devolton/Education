import {ID} from "../../../../../../_metronic/helpers";
import {CustomUser} from "../../../user-management/custom-users-list/core/custom.user.model.ts";
import {Course} from "../../../course/course-list/core/_course.model.ts";

export type Review={
    id:ID,
    review:string,
    rating:number,
    userId:ID,
    author:CustomUser,
    course:Course,
    courseId:ID
}