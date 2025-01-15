import {Column} from "react-table";
import {Course, DaysOfWeek} from "../../core/_course.model.ts";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {useCourseViewList} from "../../core/CourseViewListProvider.tsx";

import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {useCourseRequest} from "../../core/CourseQueryRequestProvider.tsx";
import {useEffect, useState} from "react";
import {PriceCell} from "../../../../common/components/table/columns/PriceCell.tsx";
import {StartEndDateCell} from "../../../../common/components/table/columns/StartEndDateCell.tsx";
import {MappingCell} from "../../../../common/components/table/columns/MapingCell.tsx";
import {QUERIES, SelectMappingEntity} from "../../../../../../../_metronic/helpers";
;
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {removeCourseById} from "../../core/_course.request.ts";
import {useCourseResponse} from "../../core/CourseQueryResponseProvider.tsx";
const ignorableFields=["actions","selection","date"]
const courseColumns:ReadonlyArray<Column<Course>> =[
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = useCourseViewList()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell:({...props})=>
        {
            const {selected,onSelect}= useCourseViewList()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useCourseRequest();
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
            const {state,updateState} = useCourseRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Price'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-125px '
            />)
        },
        id:'price',
        Cell:({...props})=>{
            useEffect(()=>{

            },[])
            return (<PriceCell price={props.data[props.row.index].price}/>)
        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useCourseRequest();
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

            return <StartEndDateCell startDate={props.data[props.row.index].courseSchedule?.dateOfStart}
                                     endDate={props.data[props.row.index].courseSchedule?.dateOfEnd}/>
        }

    },{
        Header:(props)=>{
            const {state,updateState} = useCourseRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Days'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-center'
            />)
        },
        id:'days',
        Cell:({...props}) =>{
            const [mappingCollection,setMappingCollection] = useState<Array<SelectMappingEntity>>([]);
            useEffect(()=>{
                let tempMapArr:Array<SelectMappingEntity> = []
                props.data[props.row.index].courseSchedule.days.map((day:DaysOfWeek,index:number)=>{
                    tempMapArr.push({
                        id:index,
                        title:day
                    })
                });
                setMappingCollection(tempMapArr);

            },[]);

            return (<div>{
             mappingCollection.length>0&&   <MappingCell collection={mappingCollection} back={'primary'}/>
            }
            </div>)

        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useCourseRequest();
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
            const {setItemIdForUpdate} = useCourseViewList();
            const{query} = useCourseResponse();
            const queryKey =`${QUERIES.COURSES_LIST+'-'+query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removeCourseById}
                                 queryKey={queryKey}/>)
        }
    },
]
export {courseColumns};