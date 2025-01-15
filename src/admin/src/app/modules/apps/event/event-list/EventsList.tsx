import {EventQueryRequestProvider, useEventRequest} from "./core/EventQueryRequestProvider.tsx";
import {
    EventQueryResponseProvider,
    useEventResponseLoading,
    useEventResponsePagination
} from "./core/EventQueryResponseProvider.tsx";
import {EventQueryListViewProvider, useEventListView} from "./core/EventQueryListViewProvider.tsx";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {Content} from "../../../../../_metronic/layout/components/content";
import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {EventTable} from "./table/EventTable.tsx";
import {EventEditModal} from "./modal/EventEditModal.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";
import {removeEvents} from "./core/_event.request.tsx";


const EventsList = () => {
    const {itemIdForUpdate} = useEventListView();
    const pagination = useEventResponsePagination();
    const isLoading = useEventResponseLoading();
    const {updateState} = useEventRequest();

    return <KTCard>
        <ListHeader useListView={useEventListView}
                    useQueryRequest={useEventRequest}
                    requestKey={QUERIES.EVENTS_LIST}
                    removeAction={removeEvents}
                    fieldName={'event'}/>
        <div>
            <EventTable/>
        </div>
        <Pagination pagination={pagination}
                    isLoading={isLoading}
                    updateState={updateState}/>
        {itemIdForUpdate !== undefined && <EventEditModal/>}
    </KTCard>
}

const EventsListWrapper = () => {

    return (
        <EventQueryRequestProvider>
            <EventQueryResponseProvider>
                <EventQueryListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <EventsList/>
                    </Content>
                </EventQueryListViewProvider>
            </EventQueryResponseProvider>
        </EventQueryRequestProvider>
    )
}
export {EventsListWrapper}