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

import {useReviewRequest} from "./ReviewQueryRequestProvider.tsx";
import {getAllReviews} from "./_review.request.ts";
import {Review} from "./_review.model.ts";


const ReviewQueryResponseContext = createResponseContext<Review>(initialQueryResponse)
const ReviewQueryResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = useReviewRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response} = useQuery(
        `${QUERIES.REVIEWS_LIST}-${query}`,
        () => {
            let result = getAllReviews(query);
            return result;

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <ReviewQueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </ReviewQueryResponseContext.Provider>
    )
}

const useReviewResponse = () => useContext(ReviewQueryResponseContext)

const useReviewResponseData = () => {
    const {response} = useReviewResponse()
    if (!response) {
        return []
    }
    return response.data || []
}

const useReviewResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useReviewResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useReviewResponseLoading = (): boolean => {
    const {isLoading} = useReviewResponse()
    return isLoading
}

export {
    ReviewQueryResponseProvider,
    useReviewResponse,
    useReviewResponseData,
    useReviewResponseLoading,
    useReviewResponsePagination,
}
