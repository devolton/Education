import {ReviewQueryRequestProvider, useReviewRequest} from "./core/ReviewQueryRequestProvider.tsx";
import {
    ReviewQueryResponseProvider,
    useReviewResponseLoading,
    useReviewResponsePagination
} from "./core/ReviewQueryResponseProvider.tsx";
import {ReviewQueryListViewProvider, useReviewListView} from "./core/ReviewQueryListViewProvider.tsx";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {Content} from "../../../../../_metronic/layout/components/content";
import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removeReviews} from "./core/_review.request.ts";
import {ReviewTable} from "./table/ReviewTable.tsx";

const ReviewList = () => {
    const isLoading = useReviewResponseLoading();
    const pagination = useReviewResponsePagination();
    const {updateState} = useReviewRequest();

    return (
        <KTCard>
            <ListHeader useListView={useReviewListView}
                        useQueryRequest={useReviewRequest}
                        removeAction={removeReviews}
                        fieldName={'review'}
                        requestKey={`${QUERIES.REVIEWS_LIST}`}
                        isAddVisible={false}
            />
            <div>
                <ReviewTable/>
            </div>
            <Pagination updateState={updateState} isLoading={isLoading} pagination={pagination}/>
        </KTCard>
    )
}


const ReviewListWrapper = () => {

    return (
        <ReviewQueryRequestProvider>
            <ReviewQueryResponseProvider>
                <ReviewQueryListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <ReviewList/>
                    </Content>
                </ReviewQueryListViewProvider>
            </ReviewQueryResponseProvider>
        </ReviewQueryRequestProvider>
    )

}

export {
    ReviewListWrapper
}