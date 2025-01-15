import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {useEffect} from "react";

import {PostListWrapper} from "./post-list/PostList.tsx";


const postsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Post Management',
        path: '/apps/user-management/posts',
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



const PostsPage = () => {

    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    path='posts'
                    element={
                        <>
                            <PageTitle breadcrumbs={postsBreadcrumbs}>Posts</PageTitle>
                            <PostListWrapper/>
                        </>
                    }
                />
            </Route>

            <Route index element={<Navigate to='/apps/user-management/posts'/>}/>
        </Routes>
    )
}

export default PostsPage
