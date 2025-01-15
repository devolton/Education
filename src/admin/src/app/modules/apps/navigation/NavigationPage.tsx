import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {UsersListWrapper} from "../user-management/users-list/UsersList.tsx";
import {CustomUsersListWrapper} from "../user-management/custom-users-list/CustomUsersList.tsx";
import {NavigationListWrapper} from "./navigation-list/NavigationList.tsx";

const navigationsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Navigation Management',
        path: '/apps/navigation-management/navigations',
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


const NavigationPage = () => {

    return (<Routes>
        <Route element={<Outlet/>}>
            <Route
                path='navigations'
                element={
                    <>
                        <PageTitle breadcrumbs={navigationsBreadcrumbs}>Navigations</PageTitle>
                        <NavigationListWrapper/>
                    </>
                }
            />
        </Route>
        <Route index element={<Navigate to='/apps/navigation-management/navigations'/>}/>
    </Routes>)

}

export default NavigationPage;