import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageDescription, PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {PostTagListViewProvider} from "./post-tag-list/core/PostTagListViewProvider.tsx";
import {PostTagListWrapper} from "./post-tag-list/PostTagList.tsx";

const tagsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Tag Management',
        path: '/apps/tag-management/tags',
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
            <Route element={<Outlet />}>
                <Route
                    path='tags'
                    element={
                        <>
                            <PageTitle breadcrumbs={tagsBreadcrumbs}>Tags list</PageTitle>
                            <PostTagListWrapper/>
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/apps/tag-management/tags' />} />
        </Routes>
    )
}

export default PostTagPage
