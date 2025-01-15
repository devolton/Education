import {OptionsQueryRequestProvider, useQueryRequest} from "./core/OptionQueryRequestProvider.tsx";
import {
    OptionQueryResponseProvider,
    useOptionQueryResponse,
    useOptionsQueryResponseLoading, useOptionsQueryResponsePagination
} from "./core/OptionQueryResponseProvider.tsx";
import {OptionsListViewProvider, useListView} from "./core/OptionListViewProvider.tsx";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {Content} from "../../../../../_metronic/layout/components/content";
import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {OptionTable} from "./table/OptionTable.tsx";
import React from "react";
import {OptionUserEditModal} from "./modal/OptionEditModal.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removeSelectedOptions} from "./core/_option.request.ts";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";

const OptionsList = () => {
    const {itemIdForUpdate} = useListView()
    const {updateState} = useQueryRequest();
    const {query} = useOptionQueryResponse();
    const isLoading =useOptionsQueryResponseLoading();
    const pagination = useOptionsQueryResponsePagination();
    return (
        <>
            <KTCard>
                <ListHeader
                    fieldName={'option'}
                    removeAction={removeSelectedOptions}
                    requestKey={QUERIES.OPTIONS+'-'+query}
                    useQueryRequest={useQueryRequest}
                    useListView={useListView}
                />
                <div>
                <OptionTable/>
                </div>
                <Pagination pagination={pagination} isLoading={isLoading} updateState={updateState}/>
                {itemIdForUpdate !== undefined && <OptionUserEditModal />}
            </KTCard>
        </>
    )
}

const OptionsListWrapper = () => {
    return (
        <OptionsQueryRequestProvider>
            <OptionQueryResponseProvider>
                <OptionsListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <OptionsList/>
                    </Content>
                </OptionsListViewProvider>
            </OptionQueryResponseProvider>
        </OptionsQueryRequestProvider>

    )

}
export {OptionsListWrapper}