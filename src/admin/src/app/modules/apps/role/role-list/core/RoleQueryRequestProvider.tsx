import {createContext, FC, useContext, useState} from "react";
import {
    initialQueryRequest,
    QueryRequestContextProps,
    QueryState,
    WithChildren
} from "../../../../../../_metronic/helpers";

const RoleRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest);

const RoleQueryRequestProvider:FC<WithChildren> =({children})=>{
    const [state,setState] = useState<QueryState>(initialQueryRequest.state);
    const updateState =(update:Partial<QueryState>)=>{
        const updatedState = {...state,...update} as QueryState
        setState(updatedState);

    }

    return (
        <RoleRequestContext.Provider value={{state,updateState}}>
            {children}
        </RoleRequestContext.Provider>
    )

}

const useRoleQueryRequest=()=>useContext(RoleRequestContext);
export {useRoleQueryRequest,RoleQueryRequestProvider}


