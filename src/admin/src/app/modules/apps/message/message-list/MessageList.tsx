import {MessageQueryRequestProvider, useMessageQueryRequest} from "./core/MessageQueryRequestProvider.tsx";
import {
    MessageQueryResponseProvider,
    useMessageQueryResponse,
    useMessagesQueryResponseLoading,
    useMessagesQueryResponsePagination
} from "./core/MessageQueryResponseProvider.tsx";
import {MessagesListViewProvider, useMessagesListView} from "./core/MessageListViewProvider.tsx";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {Content} from "../../../../../_metronic/layout/components/content";
import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {MessageTable} from "./table/MessageTable.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removeMessages} from "./core/_message.request.ts";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";

const MessageList = () => {
    const {query} = useMessageQueryResponse();
    const pagination = useMessagesQueryResponsePagination();
    const isLoading = useMessagesQueryResponseLoading();
    const {updateState} = useMessageQueryRequest()

    return <KTCard>
        <ListHeader useListView={useMessagesListView}
                    useQueryRequest={useMessageQueryRequest}
                    removeAction={removeMessages}
                    fieldName={'message'}
                    isAddVisible={false}
                    requestKey={QUERIES.MESSAGES_LIST + '-' + query}
        />
        <div>
            <MessageTable/>
        </div>
        <
            Pagination updateState={updateState}
                       isLoading={isLoading}
                       pagination={pagination}/>

    </KTCard>
}


const MessageListWrapper = () => {

    return (
        <MessageQueryRequestProvider>
            <MessageQueryResponseProvider>
                <MessagesListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <MessageList/>
                    </Content>
                </MessagesListViewProvider>
            </MessageQueryResponseProvider>
        </MessageQueryRequestProvider>
    )
}
export {MessageListWrapper}