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

import {CustomUser} from "./custom.user.model.ts";
import {useCustomQueryRequest} from "./CustomUserRequestProvider.tsx";
import {getCustomUsers} from "./_userRequests.ts";

const CustomQueryResponseContext = createResponseContext<CustomUser>(initialQueryResponse)
const CustomUsersQueryResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = useCustomQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response
    } = useQuery(
        `${QUERIES.USERS}-${query}`,
        () => {
            return getCustomUsers(query)

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <CustomQueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </CustomQueryResponseContext.Provider>
    )
}

const useQueryResponse = () => useContext(CustomQueryResponseContext)

const useCustomQueryResponseData = () :Array<CustomUser> => {
    const {response} = useQueryResponse();
    if (!response) {
        return []
    }
    return response.data;
}

const useCustomUserResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useCustomUserQueryResponseLoading = (): boolean => {
    const {isLoading} = useQueryResponse()
    return isLoading
}

export {
    CustomUsersQueryResponseProvider,
    useQueryResponse,
    useCustomQueryResponseData,
    useCustomUserResponsePagination,
    useCustomUserQueryResponseLoading,
}
