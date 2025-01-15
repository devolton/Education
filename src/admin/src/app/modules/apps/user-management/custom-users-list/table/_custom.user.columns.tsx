import {Column} from "react-table";
import {CustomUser} from "../core/custom.user.model.ts";
import {CustomUserRoleCell} from "./columns/CustomUserRoleCell.tsx";
import {SelectionHeader} from "../../../common/components/table/columns/SelectionHeader.tsx";
import {SelectionCell} from "../../../common/components/table/columns/SelectionCell.tsx";
import {useListView} from "../core/CustomUserListViewProvider.tsx";
import {DefaultHeader} from "../../../common/components/table/columns/DefaultHeader.tsx";
import {useCustomQueryRequest} from "../core/CustomUserRequestProvider.tsx";
import {ImageInfoCell} from "../../../common/components/table/columns/ImageInfoCell.tsx";
import {useEffect, useState} from "react";
import {QUERIES} from "../../../../../../_metronic/helpers";
import {ActionsCell} from "../../../common/components/table/columns/ActionsCell.tsx";
import {useQueryResponse} from "../core/CustomUserQueryResponseProvider.tsx";
import {removeCustomUser} from "../core/_userRequests.ts";

const ignorableFields = ["selection", "actions"];

const customUserColumns: ReadonlyArray<Column<CustomUser>> = [
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = useListView()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell: ({...props}) => {
            const {selected, onSelect} = useListView()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }

    },
    {
        Header: (props) => {
            const {state, updateState} = useCustomQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='User info'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id: 'surname',
        Cell: ({...props}) => {
            const [fullName, setFullName] = useState<string>('');
            useEffect(()=>{
                let name = props.data[props.row.index].name;
                let surname=props.data[props.row.index].surname;
                let middleName = props.data[props.row.index].middleName;
                setFullName(surname+" "+name+" "+middleName);

            },[])


            return <ImageInfoCell imagePath={props.data[props.row.index].avatarPath}
                                  upperSpanValue={fullName}
                                  downSpanValue={props.data[props.row.index].email}/>
        }

    }, {
        Header: (props) => {
            const {state, updateState} = useCustomQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Login'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        accessor: 'login'
    },
    {
        Header: (props) => {
            const {state, updateState} = useCustomQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Role'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id: 'role',
        Cell: ({...props}) => <CustomUserRoleCell user={props.data[props.row.index]}/>
    },
    {
        Header:(props)=>{
            const {state,updateState} = useCustomQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Actions'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-end'
            />)
        },
        id:'actions',
        Cell:({...props})=>{
            const {setItemIdForUpdate} = useListView();
            const{query} = useQueryResponse();
            const queryKey =`${QUERIES.USERS_LIST+'-'+query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removeCustomUser}
                                 queryKey={queryKey}/>)
        }
    }


]

export {customUserColumns}
