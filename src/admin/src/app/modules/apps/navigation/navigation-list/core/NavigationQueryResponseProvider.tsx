/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {
    createResponseContext,
    initialQueryResponse,
    initialQueryState,
    PaginationState,
    QUERIES,
    stringifyRequestQuery,
    WithChildren,
} from '../../../../../../_metronic/helpers'
import {Navigation} from "./_navigation.model.ts";
import {useNavigationQueryRequest} from "./NavigationQueryRequestProvider.tsx";
import {getNavigations} from "./_navigation.request.ts";


const NavigationQueryResponseContext = createResponseContext<Navigation>(initialQueryResponse)
const NavigationQueryResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = useNavigationQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response} = useQuery(
        `${QUERIES.NAVIGATIONS_LIST}-${query}`,
        () => {
            let navigations=  getNavigations(query);
            return navigations;

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <NavigationQueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </NavigationQueryResponseContext.Provider>
    )
}

const useNavigationQueryResponse = () => useContext(NavigationQueryResponseContext)

const useNavigationsQueryResponseData = () => {
    const {response} = useNavigationQueryResponse()
    if (!response) {
        return []
    }

    return response.data || []
}

const useNavigationsQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useNavigationQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useNavigationsQueryResponseLoading = (): boolean => {
    const {isLoading} = useNavigationQueryResponse()
    return isLoading
}

export {
    NavigationQueryResponseProvider,
    useNavigationQueryResponse,
    useNavigationsQueryResponseData,
    useNavigationsQueryResponsePagination,
    useNavigationsQueryResponseLoading,
}
