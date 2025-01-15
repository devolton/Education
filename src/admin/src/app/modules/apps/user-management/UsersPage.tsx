import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageDescription, PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {UsersListWrapper} from './users-list/UsersList'
import {CustomUsersListWrapper} from './custom-users-list/CustomUsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/apps/user-management/default-users',
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
const customUsersBreadcrumbs: Array<PageLink> = [
    {
        title: 'User Management',
        path: '/apps/user-management/users',
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


const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='default-users'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Users list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
        <Route
            path='users'
            element={
            <>
                <PageTitle breadcrumbs={customUsersBreadcrumbs}>Users</PageTitle>
                <CustomUsersListWrapper/>
            </>
            }
        />
      <Route index element={<Navigate to='/apps/user-management/users' />} />
    </Routes>
  )
}

export default UsersPage
