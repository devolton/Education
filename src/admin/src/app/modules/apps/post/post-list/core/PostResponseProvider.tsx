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
import {usePostRequest} from "./PostRequestProvider.tsx";
import {BlogPost} from "./_post.model.ts";
import {getPosts} from "./_post.request.ts";


const PostResponseContext = createResponseContext<BlogPost>(initialQueryResponse)
const PostResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = usePostRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response} = useQuery(
        `${QUERIES.POSTS_LIST}-${query}`,
        () => {
            let posts=  getPosts(query);
            return posts;

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <PostResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
    {children}
    </PostResponseContext.Provider>
)
}

const usePostResponse = () => useContext(PostResponseContext)

const usePostResponseData = () => {
    const {response} = usePostResponse()
    if (!response) {
        return []
    }

    return response.data || []
}

const usePostResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = usePostResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const usePostResponseLoading = (): boolean => {
    const {isLoading} = usePostResponse()
    return isLoading
}

export {
    PostResponseProvider,
    usePostResponse,
    usePostResponseData,
    usePostResponseLoading,
    usePostResponsePagination,
}
