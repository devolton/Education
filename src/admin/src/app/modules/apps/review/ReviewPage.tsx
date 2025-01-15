import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {ReviewListWrapper} from "./review-list/ReviewList.tsx";


const reviewBreadcrumbs: Array<PageLink> = [
    {
        title: 'Reviews Management',
        path: '/apps/review-management/reviews',
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


const  ReviewPage=()=>{

    return   (<Routes>
        <Route element={<Outlet />}>
            <Route
                path='reviews'
                element={
                    <>
                        <PageTitle breadcrumbs={reviewBreadcrumbs}>Reviews</PageTitle>
                      <ReviewListWrapper/>
                    </>
                }
            />
        </Route>
        <Route index element={<Navigate to='/apps/reviw-management/reviews' />} />
    </Routes>)

}

export  default ReviewPage;