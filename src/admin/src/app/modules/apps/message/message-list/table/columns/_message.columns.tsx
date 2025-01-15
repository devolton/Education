import {Column} from "react-table";
import {EmailMessage} from "../../core/_message.model.ts";
import {SwitcherCell} from "../../../../common/components/table/columns/SwitcherCell.tsx";
import {useCourseViewList} from "../../../../course/course-list/core/CourseViewListProvider.tsx";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {useMessagesListView} from "../../core/MessageListViewProvider.tsx";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {useMessageQueryRequest} from "../../core/MessageQueryRequestProvider.tsx";
import {QUERIES} from "../../../../../../../_metronic/helpers";
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {useMessageQueryResponse} from "../../core/MessageQueryResponseProvider.tsx";
import {changeMessageState, removeMessageById} from "../../core/_message.request.ts";
import {TwoRowsInfoCell} from "../../../../common/components/table/columns/TwoRowsInfoCell.tsx";

const ignorableFields = ["selection", "actions"]
const messageColumns: ReadonlyArray<Column<EmailMessage>> = [
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = useMessagesListView()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell: ({...props}) => {
            const {selected, onSelect} = useMessagesListView()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }
    },
    {
        Header: (props) => {
            const {state, updateState} = useMessageQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Sender info'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id: 'name',
        Cell: ({...props}) => <TwoRowsInfoCell upperStr={props.data[props.row.index].name}
                                               downStr={props.data[props.row.index].email}/>
    }
    , {
        Header: (props) => {
            const {state, updateState} = useMessageQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Message'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-200px'
            />)
        },
        accessor: 'message'
    },
    {
        Header: (props) => {
    const {state, updateState} = useMessageQueryRequest();
    return (<DefaultHeader tableProps={props}
                           title='Replied'
                           state={state}
                           updateState={updateState}
                           ignoreSortFields={ignorableFields}
                           className='min-w-125px'
    />)
},
        id: 'isReplied',
        Cell: ({...props}) => <SwitcherCell checkingState={props.data[props.row.index].isReplied}
                                            entityId={props.data[props.row.index].id}
                                            changeStateHandler={changeMessageState}/>
    },
    {
        Header: (props) => {
            const {state, updateState} = useMessageQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Actions'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-center'
            />)
        },
        id: 'actions',
        Cell: ({...props}) => {
            const {setItemIdForUpdate} = useCourseViewList();
            const {query} = useMessageQueryResponse();
            const queryKey = `${QUERIES.MESSAGES_LIST + '-' + query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removeMessageById}
                                 isUpdated={false}
                                 queryKey={queryKey}/>)
        }
    }


]
export {messageColumns}
