/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const CourseQueryRequestContext= createContext<QueryRequestContextProps>(initialQueryRequest)

const CourseQueryRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <CourseQueryRequestContext.Provider value={{state, updateState}}>
            {children}
        </CourseQueryRequestContext.Provider>
    )
}

const useCourseRequest = () => useContext(CourseQueryRequestContext)
export {CourseQueryRequestProvider, useCourseRequest}
