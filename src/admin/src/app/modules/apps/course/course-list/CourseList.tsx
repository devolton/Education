import {KTCard, QUERIES} from "../../../../../_metronic/helpers";
import {CourseTable} from "./table/CourseTable.tsx";
import {CourseQueryRequestProvider, useCourseRequest} from "./core/CourseQueryRequestProvider.tsx";
import {
    CourseQueryResponseProvider, useCourseResponse,
    useCourseResponseLoading,
    useCourseResponsePagination
} from "./core/CourseQueryResponseProvider.tsx";
import {CourseQueryListViewProvider, useCourseViewList} from "./core/CourseViewListProvider.tsx";
import {Pagination} from "../../common/components/pagination/Pagination.tsx";
import {ListHeader} from "../../common/components/header/ListHeader.tsx";
import {removeCourses} from "./core/_course.request.ts";
import {CourseModal} from "./modal/CourseModal.tsx";

const CourseList=()=>{
    const {itemIdForUpdate} =useCourseViewList()
    const {updateState} = useCourseRequest();
    const {query} = useCourseResponse();
    const isLoading = useCourseResponseLoading();
    const pagination = useCourseResponsePagination();

    return(
        <KTCard>
            <ListHeader useListView={useCourseViewList}
                        useQueryRequest={useCourseRequest}
                        removeAction={removeCourses}
                        fieldName={'course'}
                        requestKey={`${QUERIES.COURSES_LIST}-${query}`}/>
            <div>
                <CourseTable/>
            </div>
            <Pagination updateState={updateState}
            isLoading={isLoading}
            pagination={pagination}/>
            {itemIdForUpdate!==undefined && <CourseModal/>}
        </KTCard>
    )
}
const CourseListWrapper = ()=>{

    return (
        <CourseQueryRequestProvider>
            <CourseQueryResponseProvider>
                <CourseQueryListViewProvider>
                    <CourseList/>
                </CourseQueryListViewProvider>
            </CourseQueryResponseProvider>
        </CourseQueryRequestProvider>
    )
}

export {CourseListWrapper}