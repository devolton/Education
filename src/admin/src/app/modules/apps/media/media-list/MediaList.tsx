import {KTCard} from "../../../../../_metronic/helpers";
import {Content} from "../../../../../_metronic/layout/components/content";
import {MediaAssetQueryRequestProvider, useMediaAssetRequest} from "./core/MediaAssetQueryRequestProvider.tsx";
import {
    MediaAssetQueryResponseProvider,
    useMediaAssetResponseLoading, useMediaAssetResponsePagination
} from "./core/MediaAssetQueryResponseProvider.tsx";
import {MediaAssetQueryListViewProvider, useMediaAssetListView} from "./core/MediaAssetListViewProvider.tsx";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";
import {MediaTable} from "./table/MediaTable.tsx";
import {MediaAssetModal} from "./modal/MediaAssetModal.tsx";


const MediaList = () => {
    const isLoading = useMediaAssetResponseLoading();
    const pagination = useMediaAssetResponsePagination();
    const {updateState} = useMediaAssetRequest()
    const {itemIdForUpdate} =useMediaAssetListView()


    return (<KTCard>
        <div>
            <MediaTable/>
        </div>
        <Pagination updateState={updateState} isLoading={isLoading} pagination={pagination}/>
        {itemIdForUpdate!==undefined && <MediaAssetModal/>}

    </KTCard>)
}

const MediaListWrapper = () => {

    return (
        <MediaAssetQueryRequestProvider>
            <MediaAssetQueryResponseProvider>
                <MediaAssetQueryListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <MediaList/>
                    </Content>
                </MediaAssetQueryListViewProvider>
            </MediaAssetQueryResponseProvider>
        </MediaAssetQueryRequestProvider>
    )
}

export {MediaListWrapper}