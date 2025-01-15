/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {
    createResponseContext,
    initialQueryResponse,
    initialQueryState,
    PaginationState,
    QUERIES,
    stringifyRequestQuery,
    WithChildren,
} from '../../../../../../_metronic/helpers'
import {useCourseRequest} from "./CourseQueryRequestProvider.tsx";
import {Course} from "./_course.model.ts";
import {getAllCourses} from "./_course.request.ts";


const CourseQueryResponseContext = createResponseContext<Course>(initialQueryResponse)
const CourseQueryResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = useCourseRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response} = useQuery(
        `${QUERIES.COURSES_LIST}-${query}`,
        () => {
            return getAllCourses(query);

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <CourseQueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </CourseQueryResponseContext.Provider>
    )
}

const useCourseResponse = () => useContext(CourseQueryResponseContext)

const useCourseResponseData = () => {
    const {response} = useCourseResponse()
    if (!response) {
        return []
    }

    return response.data || []
}

const useCourseResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useCourseResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useCourseResponseLoading = (): boolean => {
    const {isLoading} = useCourseResponse()
    return isLoading
}

export {
    CourseQueryResponseProvider,
    useCourseResponse,
    useCourseResponseData,
    useCourseResponseLoading,
    useCourseResponsePagination,
}
