import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";

import {MediaListWrapper} from "./media-list/MediaList.tsx";

const mediaBreadcrumbs: Array<PageLink> = [
    {
        title: 'Media Management',
        path: '/apps/media-management/images',
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


const MediaPage = () => {

    return (<Routes>
        <Route element={<Outlet/>}>
            <Route
                path='images'
                element={
                    <>
                        <PageTitle breadcrumbs={mediaBreadcrumbs}>Media</PageTitle>
                        <MediaListWrapper/>
                    </>
                }
            />
        </Route>
        <Route index element={<Navigate to='/apps/media-management/images'/>}/>
    </Routes>)

}

export default MediaPage;