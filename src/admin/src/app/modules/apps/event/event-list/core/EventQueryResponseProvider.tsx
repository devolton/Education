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
import {getEvents} from "./_event.request.tsx";
import {useEventRequest} from "./EventQueryRequestProvider.tsx";
import {Event} from '../core/_event.model.ts'


const EventQueryResponseContext = createResponseContext<Event>(initialQueryResponse)
const EventQueryResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = useEventRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response} = useQuery(
        `${QUERIES.EVENTS_LIST}-${query}`,
        () => {
            return getEvents(query);

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <EventQueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
    {children}
    </EventQueryResponseContext.Provider>
)
}

const useEventResponse = () => useContext(EventQueryResponseContext)

const useEventResponseData = () => {
    const {response} = useEventResponse()
    if (!response) {
        return []
    }

    return response.data || []
}

const useEventResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useEventResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useEventResponseLoading = (): boolean => {
    const {isLoading} = useEventResponse()
    return isLoading
}

export {
    EventQueryResponseProvider,
    useEventResponse,
    useEventResponseData,
    useEventResponseLoading,
    useEventResponsePagination,
}
