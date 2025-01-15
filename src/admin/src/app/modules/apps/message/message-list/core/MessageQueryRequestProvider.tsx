/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const MessageQueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const MessageQueryRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <MessageQueryRequestContext.Provider value={{state, updateState}}>
            {children}
        </MessageQueryRequestContext.Provider>
    )
}

const useMessageQueryRequest = () => useContext(MessageQueryRequestContext)
export {MessageQueryRequestProvider, useMessageQueryRequest}
