/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const EventQueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const EventQueryRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <EventQueryRequestContext.Provider value={{state, updateState}}>
            {children}
        </EventQueryRequestContext.Provider>
    )
}

const useEventRequest = () => useContext(EventQueryRequestContext)
export {EventQueryRequestProvider, useEventRequest}
