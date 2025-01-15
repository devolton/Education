import { FC, useContext, useEffect, useMemo, useState} from "react";
import {
    createResponseContext,
    initialQueryResponse, initialQueryState, PaginationState, QUERIES,
    stringifyRequestQuery, WithChildren
} from "../../../../../../_metronic/helpers";
import {PostTag} from "./_post.tag.model.ts";
import {usePostTagQueryRequest} from "./PostTagRequestProvider.tsx";
import {useQuery} from "react-query";
import {getPostTags} from "./_post.tag.request.ts";

const PostTagQueryResponseContext = createResponseContext<PostTag>(initialQueryResponse)

const PostTagQueryResponseProvider:FC<WithChildren> =({children})=>{
    const {state} = usePostTagQueryRequest();
    const [query,setQuery] = useState<string>(stringifyRequestQuery(state));
    const updatedQuery = useMemo(()=>stringifyRequestQuery(state),[state]);
    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching:isLoading,refetch,data:response} = useQuery(
        `${QUERIES.POST_TAGS_LIST}-${query}`,
        ()=>{
            return getPostTags(query);
        }
    )

    return (
        <PostTagQueryResponseContext.Provider value={{isLoading,refetch,response,query}}>
            {children}
        </PostTagQueryResponseContext.Provider>
    );
}

const usePostTagQueryResponse=()=>useContext(PostTagQueryResponseContext);

const usePostTagQueryResponseData=():PostTag[]=>{
    const {response} =usePostTagQueryResponse();
    if(!response){
        return [];
    }

    return response.data;
}
const usePostTagQueryResponsePagination= ()=>{
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }
    const {response} = usePostTagQueryResponse();
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination

}
const usePostTagQueryResponseLoading=()=>{
    const {isLoading} = usePostTagQueryResponse();
    return isLoading;
}

export {
    PostTagQueryResponseProvider,
    usePostTagQueryResponse,
    usePostTagQueryResponseData,
    usePostTagQueryResponseLoading,
    usePostTagQueryResponsePagination
}


