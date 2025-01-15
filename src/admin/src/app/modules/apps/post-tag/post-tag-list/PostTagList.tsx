import {PostTagRequestProvider, usePostTagQueryRequest} from "./core/PostTagRequestProvider.tsx";
import {
    PostTagQueryResponseProvider,
    usePostTagQueryResponse, usePostTagQueryResponseLoading,
    usePostTagQueryResponsePagination
} from "./core/PostTagResponseProvider.tsx";
import {PostTagListViewProvider, usePostTagListView} from "./core/PostTagListViewProvider.tsx";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {Content} from "../../../../../_metronic/layout/components/content";
import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {PostTagTable} from "./table/PostTagTable.tsx";

import {PostTagEditModal} from "./tag-edit-modal/PostTagEditModal.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removePostTags} from "./core/_post.tag.request.ts";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";


const PostTagList = () => {
    const {itemIdForUpdate} = usePostTagListView();
    const {query} = usePostTagQueryResponse();
    const pagination = usePostTagQueryResponsePagination();
    const isLoading = usePostTagQueryResponseLoading();
    const {updateState} = usePostTagQueryRequest();

    return (
        <KTCard>
            <ListHeader removeAction={removePostTags}
                        fieldName={'post tag'}
                        useQueryRequest={usePostTagQueryRequest}
                        useListView={usePostTagListView}
                        requestKey={QUERIES.POST_TAGS_LIST + "-" + query}
            />
            <>
                <PostTagTable/>
            </>
            <Pagination pagination={pagination}
                        isLoading={isLoading}
                        updateState={updateState}
            />
            {itemIdForUpdate !== undefined && <PostTagEditModal/>}


        </KTCard>
    )
}

const PostTagListWrapper = () => {

    return (
        <PostTagRequestProvider>
            <PostTagQueryResponseProvider>
                <PostTagListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <PostTagList/>
                    </Content>
                </PostTagListViewProvider>
            </PostTagQueryResponseProvider>
        </PostTagRequestProvider>
    )
}
export {PostTagListWrapper}