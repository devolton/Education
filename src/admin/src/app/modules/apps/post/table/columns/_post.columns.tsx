import {Column} from "react-table";
import {BlogPost} from "../../post-list/core/_post.model.ts";
import {ColorCell} from "../../../common/components/table/ColorCell.tsx";
import {SelectionHeader} from "../../../common/components/table/columns/SelectionHeader.tsx";
import {SelectionCell} from "../../../common/components/table/columns/SelectionCell.tsx";
import {usePostListView} from "../../post-list/core/PostListViewProvider.tsx";
import {DefaultHeader} from "../../../common/components/table/columns/DefaultHeader.tsx";
import {usePostRequest} from "../../post-list/core/PostRequestProvider.tsx";
import {QUERIES} from "../../../../../../_metronic/helpers";
import {ActionsCell} from "../../../common/components/table/columns/ActionsCell.tsx";
import {usePostResponse} from "../../post-list/core/PostResponseProvider.tsx";
import {removePost} from "../../post-list/core/_post.request.ts";
import {ImageInfoCell} from "../../../common/components/table/columns/ImageInfoCell.tsx";

const ignorableFields = ["actions", "selection"]
const postColumns: ReadonlyArray<Column<BlogPost>> = [
    {
        Header: (props) => {
            const {isAllSelected, onSelectAll} = usePostListView()
            return (<SelectionHeader tableProps={props} isAllSelected={isAllSelected} onSelectAll={onSelectAll}/>)
        },
        id: 'selection',
        Cell: ({...props}) => {
            const {selected, onSelect} = usePostListView()
            return (<SelectionCell id={props.data[props.row.index].id} selected={selected} onSelect={onSelect}/>)

        }
    }
    , {
        Header: (props) => {
            const {state, updateState} = usePostRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Author'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-175px'
            />)
        },
        id: 'author',
        Cell: ({...props}) => <ImageInfoCell imagePath={props.data[props.row.index].author.avatarPath}
                                                          upperSpanValue={props.data[props.row.index].author.fullName}
                                                          downSpanValue={props.data[props.row.index].author.position}/>
    },
    {
        Header: (props) => {
            const {state, updateState} = usePostRequest();
            return (<DefaultHeader tableProps={props}
                                   title='View count'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id: 'viewCount',
        Cell: ({...props}) => <ColorCell value={props.data[props.row.index].postInfo.viewsCount} back={'primary'}/>
    },
    {
        Header: (props) => {
            const {state, updateState} = usePostRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Title'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-center'
            />)
        },
        accessor: 'title'
    },

    {
        Header: (props) => {
            const {state, updateState} = usePostRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Slug'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id: 'slug',
        Cell: ({...props}) => <ColorCell value={props.data[props.row.index].slug} back={'warning'}/>
    },
    {
        Header: (props) => {
            const {state, updateState} = usePostRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Short description'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px text-center'
            />)
        },
        accessor: 'shortDescription'
    },
    {
        Header: (props) => {
            const {state, updateState} = usePostRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Status'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignorableFields}
                                   className='min-w-150px'
            />)
        },
        id: 'status',
        Cell: ({...props}) => <ColorCell value={props.data[props.row.index].postInfo.status} back={'success'}/>
    },
    {
        Header: (props) => {
            const {state, updateState} = usePostRequest();
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
            const {setItemIdForUpdate} = usePostListView();
            const {query} = usePostResponse();
            const queryKey = `${QUERIES.POSTS_LIST + '-' + query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 removeEntity={removePost}
                                 queryKey={queryKey}/>)
        }
    }


]
export {postColumns}