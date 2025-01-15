import {createContext, FC, useContext, useState} from "react";
import {
    initialQueryRequest,
    QueryRequestContextProps,
    QueryState,
    WithChildren
} from "../../../../../../_metronic/helpers";

const PostCategoryQueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest);

const PostCategoryQueryRequestProvider:FC<WithChildren> =({children})=>{
    const [state,setState] = useState<QueryState>(initialQueryRequest.state);
    const updateState =(update:Partial<QueryState>)=>{
        const updatedState = {...state,...update} as QueryState
        setState(updatedState);

    }

    return (
        <PostCategoryQueryRequestContext.Provider value={{state,updateState}}>
            {children}
        </PostCategoryQueryRequestContext.Provider>
    )

}

const usePostCategoryQueryRequest=()=>useContext(PostCategoryQueryRequestContext);
export {usePostCategoryQueryRequest,PostCategoryQueryRequestProvider}


