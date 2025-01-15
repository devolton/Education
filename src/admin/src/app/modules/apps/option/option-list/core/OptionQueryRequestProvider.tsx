/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const OptionsQueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const OptionsQueryRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <OptionsQueryRequestContext.Provider value={{state, updateState}}>
            {children}
        </OptionsQueryRequestContext.Provider>
    )
}

const useQueryRequest = () => useContext(OptionsQueryRequestContext)
export {OptionsQueryRequestProvider, useQueryRequest}
