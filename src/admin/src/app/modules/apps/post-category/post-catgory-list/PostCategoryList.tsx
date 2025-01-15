import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {PostCategoryListViewProvider, usePostCategoryListView} from "./core/PostCategoryListViewProvider.tsx";
import {Content} from "../../../../../_metronic/layout/components/content";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {PostCategoryTable} from "./table/PostCategoryTable.tsx";
import {PostCategoryEditModal} from "./modal/PostCategoryEditModal.tsx";
import {
    PostCategoryQueryRequestProvider,
    usePostCategoryQueryRequest
} from "./core/PostCategoryQueryRequestProvider.tsx";
import {
    PostCategoryQueryResponseProvider,
    usePostCategoryQueryResponse, usePostCategoryQueryResponseLoading, usePostCategoryQueryResponsePagination
} from "./core/PostCategoryQueryResponseProvider.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removeCategories} from "./core/_category.request.ts";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";

const PostCategoryList =()=>{
    const {itemIdForUpdate}  = usePostCategoryListView()
    const {query} = usePostCategoryQueryResponse();
    const isLoading = usePostCategoryQueryResponseLoading();
    const pagination = usePostCategoryQueryResponsePagination();
    const {updateState } = usePostCategoryQueryRequest()
    return(
        <KTCard>
            <ListHeader useListView={usePostCategoryListView}
                        useQueryRequest={usePostCategoryQueryRequest}
                        removeAction={removeCategories} fieldName={'category'}
                        requestKey={QUERIES.POST_CATEGORIES_LIST+"-"+query}/>
            <div>
                <PostCategoryTable/>
            </div>
            <Pagination updateState={updateState} isLoading={isLoading} pagination={pagination}/>
            {itemIdForUpdate!==undefined && <PostCategoryEditModal/>}
        </KTCard>
    )

}

const PostCategoryListWrapper = ()=>{

    return(
        <PostCategoryQueryRequestProvider>
            <PostCategoryQueryResponseProvider>
                <PostCategoryListViewProvider>
                    <Content>
                        <ToolbarWrapper/>
                        <PostCategoryList/>
                    </Content>
                </PostCategoryListViewProvider>
            </PostCategoryQueryResponseProvider>
        </PostCategoryQueryRequestProvider>
    )



}

export {PostCategoryListWrapper}