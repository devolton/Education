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
import {Author} from "./_author.model.ts";
import {useAuthorsRequest} from "./AuthorQueryRequestProvider.tsx";
import {getAllAuthors} from "./_author.request.ts";


const AuthorQueryResponseContext = createResponseContext<Author>(initialQueryResponse)
const AuthorResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = useAuthorsRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response} = useQuery(
        `${QUERIES.AUTHORS_LIST}-${query}`,
        () => {
            return  getAllAuthors(query);


        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <AuthorQueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </AuthorQueryResponseContext.Provider>
    )
}

const useAuthorResponse = () => useContext(AuthorQueryResponseContext)

const useAuthorResponseData = () => {
    const {response} = useAuthorResponse()
    if (!response) {
        return []
    }

    return response.data || []
}

const useAuthorResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useAuthorResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useAuthorResponseLoading = (): boolean => {
    const {isLoading} = useAuthorResponse()
    return isLoading
}

export {
    AuthorResponseProvider,
    useAuthorResponseData,
    useAuthorResponsePagination,
    useAuthorResponseLoading,
    useAuthorResponse,
}
