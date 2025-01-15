import { FC, useContext, useEffect, useMemo, useState} from "react";
import {
    createResponseContext,
    initialQueryResponse, initialQueryState, PaginationState, QUERIES,
    stringifyRequestQuery, WithChildren
} from "../../../../../../_metronic/helpers";

import {useQuery} from "react-query";
import {PostCategory} from "./_post.category.model.ts";
import {usePostCategoryQueryRequest} from "./PostCategoryQueryRequestProvider.tsx";
import {getAllCategory} from "./_category.request.ts";


const PostCategoryQueryResponseContext = createResponseContext<PostCategory>(initialQueryResponse)

const PostCategoryQueryResponseProvider:FC<WithChildren> =({children})=>{
    const {state} = usePostCategoryQueryRequest();
    const [query,setQuery] = useState<string>(stringifyRequestQuery(state));
    const updatedQuery = useMemo(()=>stringifyRequestQuery(state),[state]);
    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching:isLoading,refetch,data:response} = useQuery(
        `${QUERIES.POST_CATEGORIES_LIST}-${query}`,
        ()=>{
            return getAllCategory(query);
        }
    )

    return (
        <PostCategoryQueryResponseContext.Provider value={{isLoading,refetch,response,query}}>
            {children}
        </PostCategoryQueryResponseContext.Provider>
    );
}

const usePostCategoryQueryResponse=()=>useContext(PostCategoryQueryResponseContext);

const usePostCategoryQueryResponseData=():PostCategory[]=>{
    const {response} =usePostCategoryQueryResponse();
    if(!response){
        return [];
    }

    return response.data;
}
const usePostCategoryQueryResponsePagination= ()=>{
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }
    const {response} = usePostCategoryQueryResponse();
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination

}
const usePostCategoryQueryResponseLoading=()=>{
    const {isLoading} = usePostCategoryQueryResponse();
    return isLoading;
}

export {
    PostCategoryQueryResponseProvider,
    usePostCategoryQueryResponse,
    usePostCategoryQueryResponseData,
    usePostCategoryQueryResponseLoading,
    usePostCategoryQueryResponsePagination
}


