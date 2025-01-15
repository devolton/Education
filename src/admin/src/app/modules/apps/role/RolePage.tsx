import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageDescription, PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {RoleListWrapper} from "./role-list/RoleList.tsx";

const rolesBreadcrumbs: Array<PageLink> = [
    {
        title: 'Role Management',
        path: '/apps/role-management/roles',
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


const RolePage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    path='roles'
                    element={
                        <>
                            <PageTitle breadcrumbs={rolesBreadcrumbs}>Roles list</PageTitle>
                            <RoleListWrapper/>
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/apps/role-management/roles'/>}/>
        </Routes>
    )
}

export default RolePage
