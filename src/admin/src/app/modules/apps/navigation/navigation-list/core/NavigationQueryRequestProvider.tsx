/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const NavigationQueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const NavigationQueryRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <NavigationQueryRequestContext.Provider value={{state, updateState}}>
            {children}
        </NavigationQueryRequestContext.Provider>
    )
}

const useNavigationQueryRequest = () => useContext(NavigationQueryRequestContext)
export {NavigationQueryRequestProvider, useNavigationQueryRequest}
