import {Column} from "react-table";
import {Navigation} from "../../core/_navigation.model.ts";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {useNavigationListView} from "../../core/NavigationListViewProvider.tsx";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {useNavigationQueryRequest} from "../../core/NavigationQueryRequestProvider.tsx";
import {QUERIES} from "../../../../../../../_metronic/helpers";
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {useNavigationQueryResponse} from "../../core/NavigationQueryResponseProvider.tsx";
import {removeNavigationById} from "../../core/_navigation.request.ts";
import {ColorCell} from "../../../../common/components/table/ColorCell.tsx";

const ignorableFields=["actions","selection"]
const navigationColumns:ReadonlyArray<Column<Navigation>> =[
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = useNavigationListView()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell:({...props})=>
        {
            const {selected,onSelect}= useNavigationListView()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }

    },
    {
        Header:(props)=>{
            const {state,updateState} = useNavigationQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Href'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        accessor:'href'
    },
    {
        Header:(props)=>{
            const {state,updateState} = useNavigationQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Title'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        accessor:'title'
    },
    {
        Header:(props)=>{
            const {state,updateState} = useNavigationQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Order'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id:'order',
        Cell:({...props})=> {

            return <ColorCell value={props.data[props.row.index].order} back={'primary'}/>
        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useNavigationQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Actions'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-center'
            />)
        },
        id:'actions',
        Cell:({...props})=>{
            const {setItemIdForUpdate} = useNavigationListView();
            const{query} = useNavigationQueryResponse();
            const queryKey =`${QUERIES.NAVIGATIONS_LIST+'-'+query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removeNavigationById}
                                 queryKey={queryKey}/>)
        }
    }

]

export {navigationColumns}