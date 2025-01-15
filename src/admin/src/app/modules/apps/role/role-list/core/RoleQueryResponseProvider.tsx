import { FC, useContext, useEffect, useMemo, useState} from "react";
import {
    createResponseContext,
    initialQueryResponse, initialQueryState, PaginationState, QUERIES,
    stringifyRequestQuery, WithChildren
} from "../../../../../../_metronic/helpers";
import {useQuery} from "react-query";

import {Role} from "./_role.model.ts";
import {useRoleQueryRequest} from "./RoleQueryRequestProvider.tsx";
import {getAllRole} from "./_role.request.ts";

const RoleQueryResponseContext = createResponseContext<Role>(initialQueryResponse)

const RoleQueryResponseProvider:FC<WithChildren> =({children})=>{
    const {state} = useRoleQueryRequest();
    const [query,setQuery] = useState<string>(stringifyRequestQuery(state));
    const updatedQuery = useMemo(()=>stringifyRequestQuery(state),[state]);
    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {isFetching:isLoading,refetch,data:response} = useQuery(
        `${QUERIES.ROLES_LIST}-${query}`,
        ()=>{
            return getAllRole(query);
        }
    )

    return (
        <RoleQueryResponseContext.Provider value={{isLoading,refetch,response,query}}>
            {children}
        </RoleQueryResponseContext.Provider>
    );
}

const useRoleQueryResponse=()=>useContext(RoleQueryResponseContext);

const useRoleQueryResponseData=():Role[]=>{
    const {response} =useRoleQueryResponse();
    if(!response){
        return [];
    }

    return response.data;
}
const useRoleQueryResponsePagination= ()=>{
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }
    const {response} = useRoleQueryResponse();
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination

}
const useRoleQueryResponseLoading=()=>{
    const {isLoading} = useRoleQueryResponse();
    return isLoading;
}

export {
    RoleQueryResponseProvider,
    useRoleQueryResponse,
    useRoleQueryResponsePagination,
    useRoleQueryResponseLoading,
    useRoleQueryResponseData
}


