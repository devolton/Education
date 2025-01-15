import {Review} from "../../core/_review.model.ts";
import {Column} from "react-table";
import {SelectionHeader} from "../../../../common/components/table/columns/SelectionHeader.tsx";
import {SelectionCell} from "../../../../common/components/table/columns/SelectionCell.tsx";
import {useReviewListView} from "../../core/ReviewQueryListViewProvider.tsx";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {useReviewRequest} from "../../core/ReviewQueryRequestProvider.tsx";
import {ImageInfoCell} from "../../../../common/components/table/columns/ImageInfoCell.tsx";
import {useEffect, useState} from "react";
import {QUERIES} from "../../../../../../../_metronic/helpers";
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {useReviewResponse} from "../../core/ReviewQueryResponseProvider.tsx";
import {removeReviewById} from "../../core/_review.request.ts";
import {RatingCell} from "../../../../common/components/table/columns/RatingCell.tsx";

const ignorableFields=["actions","selection","date"]
const reviewsColumns:ReadonlyArray<Column<Review>> =[
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = useReviewListView()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell:({...props})=>
        {
            const {selected,onSelect}= useReviewListView()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }
    },{
        Header:(props)=>{
            const {state,updateState} = useReviewRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Review'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id:'rating',
        Cell:({...props})=>{

            return (<RatingCell rating={props.data[props.row.index].rating} review={props.data[props.row.index].review}/>);
        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useReviewRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Author'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id:'author',
        Cell:({...props})=>{
            const [login,setLogin]=useState<string>('');
            const [fullName,setFullName] = useState<string>('');
            useEffect(()=>{
                let name = props.data[props.row.index].author.name;
                let surname = props.data[props.row.index].author.surname;
                let middleName = props.data[props.row.index].author.middleName;
                setFullName(`${surname} ${name} ${middleName}`);
                setLogin(props.data[props.row.index].author.login);

            },[])

            return <ImageInfoCell upperSpanValue={login} downSpanValue={fullName} imagePath={props.data[props.row.index].author.avatarPath}/>
        }
    },
    {
        Header:(props)=>{
            const {state,updateState} = useReviewRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Course'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id:'course',
        Cell:({...props})=>{
            const [title,setTitle]=useState<string>('');
            useEffect(()=>{
                setTitle(props.data[props.row.index].course.title);

            },[])

            return <ImageInfoCell upperSpanValue={title} downSpanValue={''} imagePath={props.data[props.row.index].course.thumbnailPath}/>
        }
    },{
        Header:(props)=>{
            const {state,updateState} = useReviewRequest();
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
            const {setItemIdForUpdate} = useReviewListView();
            const{query} = useReviewResponse();
            const queryKey =`${QUERIES.REVIEWS_LIST+'-'+query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removeReviewById}
                                 queryKey={queryKey}
                                 isUpdated={false}
            />)
        }
    }

]
export {reviewsColumns}