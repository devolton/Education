
import {ID, ListViewContextProps, QueryRequestContextProps} from "../../../../../../_metronic/helpers";
import {FC} from "react";
import {ListHeaderToolbar} from "./ListHeaderToolbar.tsx";
import {ListHeaderSearch} from "./ListHeaderSearch.tsx";
import {ListHeaderGrouping} from "./ListHeaderGrouping.tsx";
import {AxiosResponse} from "axios";

type Props = {
    useListView:()=>ListViewContextProps,
    useQueryRequest:()=>QueryRequestContextProps,
    removeAction:(ids:Array<ID>) =>Promise<AxiosResponse<any>[]>
    fieldName:string,
    requestKey:string,
    isAddVisible?:boolean
}

const ListHeader:FC<Props> = ({useListView,useQueryRequest,fieldName,removeAction ,requestKey,isAddVisible=true}) => {
    const {selected} = useListView();
    return (
        <div className='card-header border-0 pt-6'>
            <ListHeaderSearch useQueryRequest={useQueryRequest} fieldName={fieldName}/>
            {/* begin::Card toolbar */}
            <div className='card-toolbar'>
                {/* begin::Group actions */}
                {selected.length>0?
                    <ListHeaderGrouping useListView={useListView} removeAction={removeAction} requestKey={requestKey}/>
                    :(isAddVisible) && <ListHeaderToolbar useListView={useListView} fieldName={fieldName}/>}
                {/* end::Group actions */}
            </div>
            {/* end::Card toolbar */}
        </div>
    )
}

export {ListHeader}
