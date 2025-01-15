import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'

import {useCourseViewList} from "../core/CourseViewListProvider.tsx";
import {getCourseById} from "../core/_course.request.ts";
import {Course, initialCourse} from "../core/_course.model.ts";
import {CourseForm} from "./CourseForm.tsx";


const CourseFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = useCourseViewList();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: course,
        error,
    } = useQuery(
        `${QUERIES.ONE_EVENT}-${itemIdForUpdate}`,
        () => {
            let course = getCourseById(itemIdForUpdate);
            return course;

        },
        {
            cacheTime: 0,
            enabled: enabledQuery,
            onError: (err) => {
                setItemIdForUpdate(undefined)
                console.error(err)
            },
        }
    )

    if (!itemIdForUpdate) {
        let emptyCourse: Course = {
            ...initialCourse
        }
        return <CourseForm isLoading={isLoading} course={emptyCourse}/>
    }

    if (!isLoading && !error && course) {
        return <CourseForm isLoading={isLoading} course={course}/>
    }

    return null
}

export {CourseFormWrapper}
