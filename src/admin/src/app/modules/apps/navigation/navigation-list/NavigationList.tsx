import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {NavigationQueryRequestProvider, useNavigationQueryRequest} from "./core/NavigationQueryRequestProvider.tsx";
import {
    NavigationQueryResponseProvider,
    useNavigationQueryResponse,
    useNavigationsQueryResponseLoading,
    useNavigationsQueryResponsePagination
} from "./core/NavigationQueryResponseProvider.tsx";
import {NavigationListViewProvider, useNavigationListView} from "./core/NavigationListViewProvider.tsx";
import {Content} from "../../../../../_metronic/layout/components/content";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {NavigationTable} from "./table/NavigationTable.tsx";

import {NavigationEditModal} from "./modal/NavigationEditModal.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removeNavigations} from "./core/_navigation.request.ts";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";

const NavigationList = () => {
    const {itemIdForUpdate}= useNavigationListView();
    const {updateState} = useNavigationQueryRequest();
    const{query} = useNavigationQueryResponse();
    const pagination = useNavigationsQueryResponsePagination();
    const isLoading = useNavigationsQueryResponseLoading();
    return (<KTCard>
        <ListHeader useListView={useNavigationListView}
                    useQueryRequest={useNavigationQueryRequest}
                    removeAction={removeNavigations}
                    fieldName={'navigation'}
                    requestKey={QUERIES.NAVIGATIONS_LIST+'-'+query}/>
        <div>
            <NavigationTable/>
        </div>
        <Pagination updateState={updateState}
                    pagination={pagination}
                    isLoading={isLoading}
        />
        {itemIdForUpdate!==undefined && <NavigationEditModal/>}

    </KTCard>)

}

const NavigationListWrapper = () => {

    return (
        <NavigationQueryRequestProvider>
            <NavigationQueryResponseProvider>
                <NavigationListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <NavigationList/>
                    </Content>
                </NavigationListViewProvider>
            </NavigationQueryResponseProvider>
        </NavigationQueryRequestProvider>
    )

}

export {NavigationListWrapper}