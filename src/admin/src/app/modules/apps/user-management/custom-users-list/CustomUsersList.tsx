import React from 'react';
import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {Content} from "../../../../../_metronic/layout/components/content";
import {CustomUsersTable} from "./table/CustomUsersTable.tsx";
import {
    CustomUsersQueryResponseProvider,
    useCustomUserQueryResponseLoading,
    useCustomUserResponsePagination,
    useQueryResponse
} from "./core/CustomUserQueryResponseProvider.tsx";
import {CustomUserRequestProvider, useCustomQueryRequest} from "./core/CustomUserRequestProvider.tsx";
import {CustomUserListViewProvider, useListView} from "./core/CustomUserListViewProvider.tsx";
import {CustomUserEditModal} from "./user-edit-modal/CustomUserEditModal.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removeSelectedCustomUsers} from "./core/_userRequests.ts";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";


const CustomUsersList = () => {
    const {itemIdForUpdate} = useListView()
    const {query} = useQueryResponse();
    const pagination = useCustomUserResponsePagination();
    const isLoading = useCustomUserQueryResponseLoading();
    const {updateState} = useCustomQueryRequest()

    return (<>
            <KTCard>
                <ListHeader removeAction={removeSelectedCustomUsers}
                            useQueryRequest={useCustomQueryRequest}
                            useListView={useListView}
                            requestKey={QUERIES.USERS_LIST + '-'+query}
                            fieldName={'user'}
                />
                <div>
                    <CustomUsersTable/>
                </div>
                <Pagination pagination={pagination}
                            isLoading={isLoading}
                            updateState={updateState}/>
                {itemIdForUpdate !== undefined && <CustomUserEditModal/>}
            </KTCard>
        </>
    );
};

const CustomUsersListWrapper = () => {
    return (
        <CustomUserRequestProvider>
            <CustomUsersQueryResponseProvider>
                <CustomUserListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <CustomUsersList/>
                    </Content>
                </CustomUserListViewProvider>
            </CustomUsersQueryResponseProvider>
        </CustomUserRequestProvider>
    )
}

export {CustomUsersListWrapper};