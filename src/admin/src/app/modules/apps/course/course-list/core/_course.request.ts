import axios from "axios";
import {Config} from "../../../../../../env.config.ts";
import {ID} from "../../../../../../_metronic/helpers";
import {CreateCourseDto, CreateCourseScheduleDto, UpdateCourseDto, UpdateCourseScheduleDto} from "./_course.model.ts";

const getAllCourses=(query:string)=>{

    return axios.get(Config.PATH.SERVER.COURSES_URL+`/admin?${query}`)
        .then(res=>{
            return res.data;
        })
}
const getCourseById=(id:ID)=>{
    return axios.get(Config.PATH.SERVER.COURSES_URL+`/by-id/${id}`)
        .then(res=>{
            return res.data;
        })
}

const createCourse=(createCourseDto:CreateCourseDto,
                    createCourseScheduleDto:CreateCourseScheduleDto,
                    poster:File=null,
                    thumbnail:File=null
                    )=>{
    return axios.post(Config.PATH.SERVER.COURSES_URL,{course:createCourseDto, course_schedule:createCourseScheduleDto})
        .then(res=>{
            let createdEntity = res.data;
            if(createdEntity.id){
                if(poster)
                    updateCoursePoster(createdEntity.id,poster);
                if(thumbnail)
                    updateCourseThumbnail(createdEntity.id,thumbnail)
            }
        })
}
const updateCourse =(id:ID,updateCourseDto:UpdateCourseDto, updateCourseScheduleDto:UpdateCourseScheduleDto)=>{
    return axios.put(Config.PATH.SERVER.COURSES_URL+`/${id}`,{
        course:updateCourseDto,
        course_schedule:updateCourseScheduleDto
    });
}
const updateCourseThumbnail=(id:ID,thumbnail:File)=>{
    return axios.put(Config.PATH.SERVER.COURSES_URL+`/thumbnail/${id}`,{thumbnail:thumbnail},{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};
const updateCoursePoster = (id:ID, poster:File)=>{
    return axios.put(Config.PATH.SERVER.COURSES_URL+`/poster/${id}`, {poster:poster},{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const removeCourseById=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.COURSES_URL+`/${id}`);
}

const removeCourses=(ids:Array<ID>)=>{
    let reqs = ids.map(id=>axios.delete(Config.PATH.SERVER.COURSES_URL+`/${id}`));
     return axios.all(reqs);
}
const removeCourseThumbnail=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.COURSES_URL+`/thumbnail/${id}`);
}
const removeCoursePoster =(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.COURSES_URL+`/poster/${id}`);
}
export {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourseThumbnail,
    updateCoursePoster,
    updateCourse,
    removeCourses,
    removeCourseThumbnail,
    removeCoursePoster,
    removeCourseById
}