import {Column} from "react-table";
import {PostTag} from "../../core/_post.tag.model.ts";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {usePostTagListView} from "../../core/PostTagListViewProvider.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {usePostTagQueryResponse} from "../../core/PostTagResponseProvider.tsx";
import {usePostTagQueryRequest} from "../../core/PostTagRequestProvider.tsx";
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {removePostTagById} from "../../core/_post.tag.request.ts";


const ignorableFields = ["selection", "actions"];

const postTagColumn: ReadonlyArray<Column<PostTag>> = [
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = usePostTagListView();
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell: ({...props}) => {
            const {selected, onSelect} = usePostTagListView();
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)
        }
    },
    {
        Header: (props) => {
            const {state, updateState} = usePostTagQueryRequest();

            return (<DefaultHeader tableProps={props} state={state} updateState={updateState}
                                   ignoreSortFields={ignorableFields}/>)
        },
        accessor: 'name'
    }, {
        Header: (props) => {
            const {state, updateState} = usePostTagQueryRequest();
            return <DefaultHeader tableProps={props} state={state} updateState={updateState}
                                  ignoreSortFields={ignorableFields}/>
        },
        id: 'actions',
        Cell: ({...props}) => {
            const {setItemIdForUpdate} = usePostTagListView();
            const {query} = usePostTagQueryResponse();
            return (<ActionsCell id={props.data[props.row.index].id} removeEntity={removePostTagById} query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}/>)
        }

    }

]
export {postTagColumn}