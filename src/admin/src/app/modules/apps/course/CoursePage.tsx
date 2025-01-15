import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {CourseListWrapper} from "./course-list/CourseList.tsx";


const coursesBreadcrumbs: Array<PageLink> = [
    {
        title: 'Courses Management',
        path: '/apps/course-management/courses',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]


const EventPage = () => {

    return (<Routes>
            <Route element={<Outlet/>}>
                <Route
                    path='courses'
                    element={
                        <>
                            <PageTitle breadcrumbs={coursesBreadcrumbs}>Courses</PageTitle>
                            <CourseListWrapper/>
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/apps/course-management/courses'/>}/>
        </Routes>
    )

}

export default EventPage;