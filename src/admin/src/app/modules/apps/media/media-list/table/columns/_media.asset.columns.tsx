import {Column} from "react-table";
import {MediaAsset} from "../../core/_media.asset.model.ts";
import {DefaultHeader} from "../../../../common/components/table/columns/DefaultHeader.tsx";
import {useMediaAssetRequest} from "../../core/MediaAssetQueryRequestProvider.tsx";
import {ColorCell} from "../../../../common/components/table/ColorCell.tsx";
import {ImageInfoCell} from "../../../../common/components/table/columns/ImageInfoCell.tsx";
import {useEventRequest} from "../../../../event/event-list/core/EventQueryRequestProvider.tsx";
import {useEventListView} from "../../../../event/event-list/core/EventQueryListViewProvider.tsx";
import {usePostResponse} from "../../../../post/post-list/core/PostResponseProvider.tsx";
import {QUERIES} from "../../../../../../../_metronic/helpers";
import {ActionsCell} from "../../../../common/components/table/columns/ActionsCell.tsx";
import {removeEventById} from "../../../../event/event-list/core/_event.request.tsx";
import {useMediaAssetListView} from "../../core/MediaAssetListViewProvider.tsx";
import {ImageCell} from "../../../../common/components/table/columns/ImageCell.tsx";

const ignoreSortFields = ["actions", "selection", 'view'];

const mediaAssetColumns: ReadonlyArray<Column<MediaAsset>> = [

    {
        Header: (props) => {
            const {state, updateState} = useMediaAssetRequest();

            return (<DefaultHeader tableProps={props} title='Name' state={state} updateState={updateState}
                                   ignoreSortFields={ignoreSortFields}/>)
        },
        accessor: 'name'
    },
    {
        Header: (props) => {
            const {state, updateState} = useMediaAssetRequest();

            return (<DefaultHeader title='Category' tableProps={props} state={state} updateState={updateState}
                                   ignoreSortFields={ignoreSortFields}/>)
        },
        id: 'category',
        Cell: ({...props}) => {

            return (<ColorCell value={props.data[props.row.index].category} back={'primary'}/>)
        }
    }
    , {
        Header: (props) => {
            const {state, updateState} = useMediaAssetRequest();


            return (<DefaultHeader tableProps={props}
                                   title={'View'}
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignoreSortFields}/>)
        },
        id: 'view',
        Cell: ({...props}) => {

            return (<ImageCell path={props.data[props.row.index].path} alt={props.data[props.row.index].alt}/>)
        }

    }, {
        Header: (props) => {
            const {state, updateState} = useMediaAssetRequest();
            return (<DefaultHeader tableProps={props}
                                   title='Actions'
                                   state={state}
                                   updateState={updateState}
                                   ignoreSortFields={ignoreSortFields}
                                   className='min-w-150px text-center'
            />)
        },
        id: 'actions',
        Cell: ({...props}) => {
            const {setItemIdForUpdate} = useMediaAssetListView();
            const {query} = usePostResponse();
            const queryKey = `${QUERIES.MEDIA_ASSETS_LIST + '-' + query}`
            return (<ActionsCell id={props.data[props.row.index].id}
                                 query={query}
                                 setItemIdForUpdate={setItemIdForUpdate}
                                 queryKey={queryKey}/>)
        }
    }

]

export {mediaAssetColumns}