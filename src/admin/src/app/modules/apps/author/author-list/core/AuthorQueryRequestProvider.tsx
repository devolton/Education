/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const AuthorQueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const AuthorQueryRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <AuthorQueryRequestContext.Provider value={{state, updateState}}>
            {children}
        </AuthorQueryRequestContext.Provider>
    )
}

const useAuthorsRequest = () => useContext(AuthorQueryRequestContext)
export {AuthorQueryRequestProvider, useAuthorsRequest}
