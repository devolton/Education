/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext} from 'react'
import {
    QueryState,
    QueryRequestContextProps,
    initialQueryRequest,
    WithChildren,
} from '../../../../../../_metronic/helpers'

const MediaAssetQueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const MediaAssetQueryRequestProvider: FC<WithChildren> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <MediaAssetQueryRequestContext.Provider value={{state, updateState}}>
            {children}
        </MediaAssetQueryRequestContext.Provider>
    )
}

const useMediaAssetRequest = () => useContext(MediaAssetQueryRequestContext)
export {MediaAssetQueryRequestProvider, useMediaAssetRequest}
