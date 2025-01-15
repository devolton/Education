import {Column} from "react-table";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {useEventListView} from "../../core/EventQueryListViewProvider.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {Event} from '../../core/_event.model.ts'
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {usePostResponse} from "../../../../post/post-list/core/PostResponseProvider.tsx";
import {removeEventById} from "../../core/_event.request.tsx";
import {QUERIES} from "../../../../../../../_metronic/helpers";
import {ColorCell} from "../../../../common/components/table/ColorCell.tsx";
import {statusToColorConverter} from "../../common/status.to.color.converter.ts";
import {PriceCell} from "../../../../common/components/table/columns/PriceCell.tsx";
import {useEffect} from "react";

import {useEventRequest} from "../../core/EventQueryRequestProvider.tsx";
import {StartEndDateCell} from "../../../../common/components/table/columns/StartEndDateCell.tsx";
import {KeyValueInfoCell} from "../../../../common/components/table/columns/KeyValueInfoCell.tsx";
import {TicketCell} from "../../../../common/components/table/columns/TicketCell.tsx";
const ignorableFields=["actions","selection","ticketPrice","date","company"]
const eventColumns: ReadonlyArray<Column<Event>> = [
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = useEventListView()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell:({...props})=>
        {
            const {selected,onSelect}= useEventListView()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useEventRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Title'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-center'
            />)
        },
        accessor:'title'
    },
    {
        Header:(props)=>{
            const {state,updateState} = useEventRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Status'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-80px'
            />)
        },
        id:'status',
        Cell:({...props})=><ColorCell value={props.data[props.row.index].status}
                                      back={statusToColorConverter(props.data[props.row.index].status)}/>

    },
    {
        Header:(props)=>{
            const {state,updateState} = useEventRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Price'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-125px text-center'
            />)
        },
        id:'ticketPrice',
        Cell:({...props})=>{
            useEffect(()=>{

            },[])
            return (<PriceCell price={props.data[props.row.index].eventDetail.ticketPrice}/>)
        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useEventRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Date'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-center'
            />)
        },
        id:'date',
        Cell:({...props})=>{

            return <StartEndDateCell startDate={props.data[props.row.index].eventVenue?.startDate}
                                     endDate={props.data[props.row.index].eventVenue?.endDate}/>
        }

    },
    {
        Header:(props)=>{
            const {state,updateState} = useEventRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Tickets'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-130px'
            />)
        },
        id:'freePlaces',
       Cell:({...props})=>{
            return(<TicketCell freeTickets={props.data[props.row.index].eventDetail.freePlaces}
                               allTickets={props.data[props.row.index].eventDetail.numberOfPlaces}/>)
       }

    },
    {
        Header:(props)=>{
            const {state,updateState} = useEventRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Location'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-110px'
            />)
        },
        id:'company',
        Cell:({...props})=>{
            const keyValue:Record<string,string> = {
                company:props.data[props.row.index].eventDetail.company,
                city:props.data[props.row.index].eventVenue.city,
                street:props.data[props.row.index].eventVenue.street


            }

            return (<KeyValueInfoCell keyValueCollection={keyValue}/>)
        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useEventRequest();
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
            const {setItemIdForUpdate} = useEventListView();
            const{query} = usePostResponse();
            const queryKey =`${QUERIES.EVENTS_LIST+'-'+query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removeEventById}
                                 queryKey={queryKey}/>)
        }
    },

]
export {eventColumns}