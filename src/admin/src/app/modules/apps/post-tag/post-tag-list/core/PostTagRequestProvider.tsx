import {createContext, FC, useContext, useState} from "react";
import {
    initialQueryRequest,
    QueryRequestContextProps,
    QueryState,
    WithChildren
} from "../../../../../../_metronic/helpers";

const PostTagRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest);

const PostTagRequestProvider:FC<WithChildren> =({children})=>{
    const [state,setState] = useState<QueryState>(initialQueryRequest.state);
   const updateState =(update:Partial<QueryState>)=>{
       const updatedState = {...state,...update} as QueryState
       setState(updatedState);

   }

    return (
        <PostTagRequestContext.Provider value={{state,updateState}}>
            {children}
        </PostTagRequestContext.Provider>
    )

}

const usePostTagQueryRequest=()=>useContext(PostTagRequestContext);
export {usePostTagQueryRequest,PostTagRequestProvider}


