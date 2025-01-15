import {Column} from "react-table";
import {Role} from "../../core/_role.model.ts";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {useRoleListView} from "../../core/RoleListViewProvider.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {useRoleQueryRequest} from "../../core/RoleQueryRequestProvider.tsx";
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {useRoleQueryResponse} from "../../core/RoleQueryResponseProvider.tsx";
import {removeRole} from "../../core/_role.request.ts";

const ignorableFields=["selection","actions"]
const roleColumn: ReadonlyArray<Column<Role>> = [
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = useRoleListView();
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell: ({...props}) => {
            const {selected, onSelect} = useRoleListView()
            return <SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>
        }
    },
    {
        Header: (props) => {
            const {state, updateState}= useRoleQueryRequest();
            return (<DefaultHeader tableProps={props} state={state} updateState={updateState} ignoreSortFields={ignorableFields}/>)
        },
        accessor: 'value'
    },
    {
        Header: (props) => {
            const {state,updateState} = useRoleQueryRequest();
            return (<DefaultHeader tableProps={props} state={state} updateState={updateState} ignoreSortFields={ignorableFields}/>)
        },
        accessor: 'description'
    },
    {
        Header: (props) => {
            const {state,updateState} = useRoleQueryRequest();
            return (<DefaultHeader tableProps={props} state={state} updateState={updateState} ignoreSortFields={ignorableFields}/>)
        },
        id: 'actions',
        Cell: ({...props}) => {
            const {query} = useRoleQueryResponse();
            const {setItemIdForUpdate} = useRoleListView();
            return (<ActionsCell id={props.data[props.row.index].id} query={query} setItemIdForUpdate={setItemIdForUpdate} removeEntity={removeRole}/>)
        }
    }
]
export {roleColumn}