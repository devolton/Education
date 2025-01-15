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
import {useMessageQueryRequest} from "./MessageQueryRequestProvider.tsx";
import {EmailMessage} from "./_message.model.ts";
import {getMessages} from "./_message.request.ts";


const MessageQueryResponseContext = createResponseContext<EmailMessage>(initialQueryResponse)
const MessageQueryResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = useMessageQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response} = useQuery(
        `${QUERIES.MESSAGES_LIST}-${query}`,
        () => {
            let options=  getMessages(query);
            return options;

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <MessageQueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </MessageQueryResponseContext.Provider>
    )
}

const useMessageQueryResponse = () => useContext(MessageQueryResponseContext)

const useMessagesQueryResponseData = () => {
    const {response} = useMessageQueryResponse()
    if (!response) {
        return []
    }

    return response.data || []
}

const useMessagesQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useMessageQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useMessagesQueryResponseLoading = (): boolean => {
    const {isLoading} = useMessageQueryResponse()
    return isLoading
}

export {
    MessageQueryResponseProvider,
    useMessagesQueryResponseLoading,
    useMessageQueryResponse,
    useMessagesQueryResponseData,
    useMessagesQueryResponsePagination,
}
