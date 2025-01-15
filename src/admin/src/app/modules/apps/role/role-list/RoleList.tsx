import {RoleListViewProvider, useRoleListView} from "./core/RoleListViewProvider.tsx";
import {RoleQueryRequestProvider, useRoleQueryRequest} from "./core/RoleQueryRequestProvider.tsx";
import {
    RoleQueryResponseProvider, useRoleQueryResponse,
    useRoleQueryResponseLoading,
    useRoleQueryResponsePagination
} from "./core/RoleQueryResponseProvider.tsx";
import {Content} from "../../../../../_metronic/layout/components/content";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {RoleTable} from "./table/RoleTable.tsx";
import {RoleEditModal} from "./model/RoleEditModal.tsx";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removeManyRoles} from "./core/_role.request.ts";

const RoleList = () => {
    const pagination =useRoleQueryResponsePagination();
    const isLoading = useRoleQueryResponseLoading();
    const {itemIdForUpdate} = useRoleListView();
    const {updateState} = useRoleQueryRequest();
    const {query} = useRoleQueryResponse();
    return (
        <KTCard>
            <div>
                <ListHeader useListView={useRoleListView}
                            useQueryRequest={useRoleQueryRequest}
                            removeAction={removeManyRoles}
                            fieldName={'role'}
                            requestKey={QUERIES.ROLES_LIST+"-"+query}/>
                <RoleTable/>
            </div>
            {itemIdForUpdate !== undefined && <RoleEditModal/>}
            <Pagination pagination={pagination} isLoading={isLoading} updateState={updateState}/>
        </KTCard>
    )
}


const RoleListWrapper = () => {

    return (
        <RoleQueryRequestProvider>
            <RoleQueryResponseProvider>
                <RoleListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <RoleList/>
                    </Content>
                </RoleListViewProvider>
            </RoleQueryResponseProvider>

        </RoleQueryRequestProvider>

    )
}
export {RoleListWrapper}