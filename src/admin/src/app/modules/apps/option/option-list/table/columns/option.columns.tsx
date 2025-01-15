import {Column} from "react-table";
import {Option} from "../../core/_option.model.ts";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {useListView} from "../../core/OptionListViewProvider.tsx";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {QUERIES} from "../../../../../../../_metronic/helpers";
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {useOptionQueryResponse} from "../../core/OptionQueryResponseProvider.tsx";
import {removeOption} from "../../core/_option.request.ts";
import {useQueryRequest} from "../../core/OptionQueryRequestProvider.tsx";
import {ColorCell} from "../../../../common/components/table/ColorCell.tsx";

const ignorableFields=["actions","selection"]
const optionColumns: ReadonlyArray<Column<Option>> = [
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = useListView()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell:({...props})=>
        {
            const {selected,onSelect}= useListView()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Name'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        accessor:'name'
    },
    {
        Header:(props)=>{
            const {state,updateState} = useQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Value'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        accessor:'value'
    },
    {
        Header:(props)=>{
            const {state,updateState} = useQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Relation'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id:'relation',
        Cell:({...props})=>{

            return <ColorCell value={props.data[props.row.index].relation} back={'success'}/>
        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useQueryRequest();
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
            const {setItemIdForUpdate} = useListView();
            const{query} = useOptionQueryResponse();
            const queryKey =`${QUERIES.OPTIONS+'-'+query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removeOption}
                                 queryKey={queryKey}/>)
        }
    }

]

export {optionColumns}