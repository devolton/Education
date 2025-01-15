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
import {MediaAsset} from "./_media.asset.model.ts";
import {useMediaAssetRequest} from "./MediaAssetQueryRequestProvider.tsx";
import {getAllMediaAssets} from "./_media.asset.request.ts";


const MediaAssetQueryResponseContext = createResponseContext<MediaAsset>(initialQueryResponse)
const MediaAssetQueryResponseProvider: FC<WithChildren> = ({children}) => {
    const {state} = useMediaAssetRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching, refetch, data: response} = useQuery(
        `${QUERIES.MEDIA_ASSETS_LIST}-${query}`,
        () => {
            return getAllMediaAssets(query);

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <MediaAssetQueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </MediaAssetQueryResponseContext.Provider>
    )
}

const useMediaAssetResponse = () => useContext(MediaAssetQueryResponseContext)

const useMediaAssetResponseData = () => {
    const {response} = useMediaAssetResponse()
    if (!response) {
        return []
    }

    return response.data || []
}

const useMediaAssetResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useMediaAssetResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useMediaAssetResponseLoading = (): boolean => {
    const {isLoading} = useMediaAssetResponse()
    return isLoading
}

export {
    MediaAssetQueryResponseProvider,
    useMediaAssetResponse,
    useMediaAssetResponseData,
    useMediaAssetResponseLoading,
    useMediaAssetResponsePagination,
}
