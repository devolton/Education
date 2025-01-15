/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const ReviewQueryRequestContext= createContext<QueryRequestContextProps>(initialQueryRequest)

const ReviewQueryRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <ReviewQueryRequestContext.Provider value={{state, updateState}}>
            {children}
        </ReviewQueryRequestContext.Provider>
    )
}

const useReviewRequest = () => useContext(ReviewQueryRequestContext)
export {ReviewQueryRequestProvider, useReviewRequest}
