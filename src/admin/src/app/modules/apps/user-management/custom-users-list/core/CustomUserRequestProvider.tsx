/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const CustomUserRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const CustomUserRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <CustomUserRequestContext.Provider value={{state, updateState}}>
            {children}
        </CustomUserRequestContext.Provider>
    )
}

const useCustomQueryRequest = () => useContext(CustomUserRequestContext)
export {CustomUserRequestProvider, useCustomQueryRequest}
