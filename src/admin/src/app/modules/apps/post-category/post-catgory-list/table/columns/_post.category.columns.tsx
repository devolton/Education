
import {Column} from "react-table";
import {PostCategory} from "../../core/_post.category.model.ts";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {usePostCategoryListView} from "../../core/PostCategoryListViewProvider.tsx";
import {useCourseRequest} from "../../../../course/course-list/core/CourseQueryRequestProvider.tsx";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {usePostCategoryQueryRequest} from "../../core/PostCategoryQueryRequestProvider.tsx";
import {useCourseResponse} from "../../../../course/course-list/core/CourseQueryResponseProvider.tsx";
import {QUERIES} from "../../../../../../../_metronic/helpers";
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {removeCourseById} from "../../../../course/course-list/core/_course.request.ts";
import {removeCategory} from "../../core/_category.request.ts";

const ignorableFields=["actions","selection","date"]

const  postCategoryColumns: ReadonlyArray<Column<PostCategory> > =[
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = usePostCategoryListView()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell:({...props})=>
        {
            const {selected,onSelect}= usePostCategoryListView()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = usePostCategoryQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Name'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-125px text-center'
            />)
        },
        accessor:'name'
    },
    {
        Header:(props)=>{
            const {state,updateState} = usePostCategoryQueryRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Description'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        accessor: 'description'
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
            const {setItemIdForUpdate} = usePostCategoryListView();
            const{query} = useCourseResponse();
            const queryKey =`${QUERIES.POST_CATEGORIES_LIST+'-'+query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removeCategory}
                                 queryKey={queryKey}/>)
        }
    }

]
export {postCategoryColumns}