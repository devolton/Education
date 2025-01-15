import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {AuthorQueryRequestProvider, useAuthorsRequest} from "./core/AuthorQueryRequestProvider.tsx";
import {
    AuthorResponseProvider, useAuthorResponse,
    useAuthorResponseLoading,
    useAuthorResponsePagination
} from "./core/AuthorQueryResponseProvider.tsx";
import {AuthorListViewProvider, useAuthorViewList} from "./core/AuthorQueryListViewProvider.tsx";
import {ToolbarWrapper} from "../../../../../_metronic/layout/components/toolbar";
import {Content} from "../../../../../_metronic/layout/components/content";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removeAuthors} from "./core/_author.request.ts";
import {AuthorTable} from "./table/AuthorTable.tsx";
import {AuthorModal} from "./model/AuthorModal.tsx";

const AuthorList = () => {
    let pagination = useAuthorResponsePagination();
    let isLoading = useAuthorResponseLoading();
    let {updateState} = useAuthorsRequest();
    let {query} = useAuthorResponse()
    let {itemIdForUpdate} =useAuthorViewList();

    return (<KTCard>
        <ListHeader fieldName={'author'}
                    useQueryRequest={useAuthorsRequest}
                    useListView={useAuthorViewList}
                    removeAction={removeAuthors}
                    requestKey={`${QUERIES.AUTHORS_LIST}-${query}`}
        />
        <div>
            <AuthorTable/>
        </div>
        <Pagination isLoading={isLoading}
                    pagination={pagination}
                    updateState={updateState}/>
        {itemIdForUpdate!==undefined && <AuthorModal/>}
    </KTCard>)
}

const AuthorListWrapper = () => {

    return (
        <AuthorQueryRequestProvider>
            <AuthorResponseProvider>
                <AuthorListViewProvider>
                    <ToolbarWrapper/>
                    <Content>
                        <AuthorList/>
                    </Content>
                </AuthorListViewProvider>
            </AuthorResponseProvider>
        </AuthorQueryRequestProvider>
    )
}
export {AuthorListWrapper}