import api from "../http/core";

export class CourseService{

    static async getCourseBySlug(slug){
        return await api.get(`/courses/${slug}`);
    }
    static async getCoursesRange(limit){
        return await api.get(`/courses?limit=${limit}`);
    }
    static async getRandomCoursesRange(limit){
        return await api.get(`/courses/random?limit=${limit}`);
    }

}