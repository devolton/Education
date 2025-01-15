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
import {Option} from "./_option.model.ts";
import {useQueryRequest} from "./OptionQueryRequestProvider.tsx";
import {getAllOptions} from "./_option.request.ts";


const OptionQueryResponseContext = createResponseContext<Option>(initialQueryResponse)
const OptionQueryResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = useQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response} = useQuery(
        `${QUERIES.OPTIONS}-${query}`,
        () => {
            let options=  getAllOptions(query);
            return options;

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <OptionQueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </OptionQueryResponseContext.Provider>
    )
}

const useOptionQueryResponse = () => useContext(OptionQueryResponseContext)

const useOptionsQueryResponseData = () => {
    const {response} = useOptionQueryResponse()
    if (!response) {
        return []
    }

    return response.data || []
}

const useOptionsQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useOptionQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useOptionsQueryResponseLoading = (): boolean => {
    const {isLoading} = useOptionQueryResponse()
    return isLoading
}

export {
    OptionQueryResponseProvider,
    useOptionQueryResponse,
    useOptionsQueryResponseData,
    useOptionsQueryResponsePagination,
    useOptionsQueryResponseLoading,
}
