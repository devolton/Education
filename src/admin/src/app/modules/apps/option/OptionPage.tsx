import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {UsersListWrapper} from "../user-management/users-list/UsersList.tsx";
import {CustomUsersListWrapper} from "../user-management/custom-users-list/CustomUsersList.tsx";
import {OptionsListWrapper} from "./option-list/OptionsList.tsx";

const optionsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Options Management',
        path: '/apps/options-management/options',
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


const  OptionPage=()=>{

    return   (<Routes>
        <Route element={<Outlet />}>
            <Route
                path='options'
                element={
                    <>
                        <PageTitle breadcrumbs={optionsBreadcrumbs}>Options</PageTitle>
                        <OptionsListWrapper/>

                    </>
                }
            />
        </Route>
        <Route index element={<Navigate to='/apps/option-management/options' />} />
    </Routes>)

}

export  default OptionPage;