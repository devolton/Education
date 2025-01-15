import {useQueryClient, useMutation} from 'react-query'
import {ID, ListViewContextProps, QUERIES, QueryResponseContextProps} from "../../../../../../_metronic/helpers";
import {FC} from "react";
import {AxiosResponse} from "axios";

type Props={
    useListView:()=>ListViewContextProps,
    requestKey:string
    removeAction:(ids:Array<ID>)=>Promise<AxiosResponse<any>[]>
    
}


const ListHeaderGrouping:FC<Props> = ({useListView,requestKey,removeAction}) => {
    const {selected, clearSelected} = useListView();
    const queryClient = useQueryClient();


    const deleteSelectedItems = useMutation(() => removeAction(selected), {
        onSuccess: () => {
            queryClient.invalidateQueries([requestKey])
            clearSelected()
        },
        onError:()=>{
            console.log("Events remove operation error!");
            clearSelected();
        }
    })

    return (
        <div className='d-flex justify-content-end align-items-center'>
            <div className='fw-bolder me-5'>
                <span className='me-2'>{selected.length}</span> Selected
            </div>

            <button
                type='button'
                className='btn btn-danger'
                onClick={async () => await deleteSelectedItems.mutateAsync()}
            >
                Delete Selected
            </button>
        </div>
    )
}

export {ListHeaderGrouping}
