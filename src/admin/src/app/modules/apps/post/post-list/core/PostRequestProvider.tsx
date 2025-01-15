/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const PostRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const PostRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <PostRequestContext.Provider value={{state, updateState}}>
    {children}
    </PostRequestContext.Provider>
)
}

const usePostRequest = () => useContext(PostRequestContext)
export {PostRequestProvider, usePostRequest}
