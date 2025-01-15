import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {PostRequestProvider, usePostRequest} from "./core/PostRequestProvider.tsx";
import {
    PostResponseProvider,
    usePostResponse,
    usePostResponseLoading,
    usePostResponsePagination
} from "./core/PostResponseProvider.tsx";
import {PostListViewProvider, usePostListView} from "./core/PostListViewProvider.tsx";
import {Content} from "../../../../../_metronic/layout/components/content";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {PostsTable} from "../table/PostsTable.tsx";
import {PostEditModal} from "./modal/PostEditModal.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";
import {removeManyPost} from "./core/_post.request.ts";


const PostList = () => {
    const {itemIdForUpdate} = usePostListView();
    const {updateState} = usePostRequest();
    const {query} = usePostResponse();
    const pagination = usePostResponsePagination();
    const isLoading = usePostResponseLoading();
    return <KTCard>
        <ListHeader useListView={usePostListView}
                    useQueryRequest={usePostRequest}
                    fieldName={'post'}
                    removeAction={removeManyPost}
                    requestKey={QUERIES.POSTS_LIST + '-' + query}
        />
        <div>
            <PostsTable/>
        </div>
        <Pagination pagination={pagination}
                    isLoading={isLoading}
                    updateState={updateState}/>
        {itemIdForUpdate !== undefined && <PostEditModal/>}
    </KTCard>
}

const PostListWrapper = () => {
    return (
        <PostRequestProvider>
            <PostResponseProvider>
                <PostListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <PostList/>
                    </Content>
                </PostListViewProvider>
            </PostResponseProvider>
        </PostRequestProvider>

    )
}

export {
    PostListWrapper
}