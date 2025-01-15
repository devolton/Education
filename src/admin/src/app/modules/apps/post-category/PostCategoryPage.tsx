import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageDescription, PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {PostCategoryListWrapper} from "./post-catgory-list/PostCategoryList.tsx";


const categoryBreadcrumbs: Array<PageLink> = [
    {
        title: 'Category Management',
        path: '/apps/category-management/categories',
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


const PostTagPage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    path='categories'
                    element={
                        <>
                            <PageTitle breadcrumbs={categoryBreadcrumbs}>Category list</PageTitle>
                            <PostCategoryListWrapper/>
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/apps/category-management/categories'/>}/>
        </Routes>
    )
}

export default PostTagPage
