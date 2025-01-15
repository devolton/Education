import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {AuthorListWrapper} from "./author-list/AuthorList.tsx";


const authorsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Authors Management',
        path: '/apps/author-management/authors',
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


const AuthorPage = () => {

    return (<Routes>
            <Route element={<Outlet/>}>
                <Route
                    path='authors'
                    element={
                        <>
                            <PageTitle breadcrumbs={authorsBreadcrumbs}>Authors</PageTitle>
                            <AuthorListWrapper/>
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/apps/author-management/authors'/>}/>
        </Routes>
    )

}

export default AuthorPage;