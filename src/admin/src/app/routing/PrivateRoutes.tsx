import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'

const PrivateRoutes = () => {
    const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
    const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
    const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
    const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
    const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
    const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
    const OptionPage = lazy(() => import('../modules/apps/option/OptionPage'));
    const PostsPage = lazy(() => import('../modules/apps/post/PostsPage'));
    const PostTagsPage = lazy(() => import('../modules/apps/post-tag/PostTagPage'));
    const PostCategoryPage = lazy(() => import('../modules/apps/post-category/PostCategoryPage'))
    const RolePage = lazy(() => import('../modules/apps/role/RolePage'));
    const NavigationPage = lazy(() => import('../modules/apps/navigation/NavigationPage'));
    const ReviewPage = lazy(() => import('../modules/apps/review/ReviewPage'));
    const MessagePage = lazy(() => import('../modules/apps/message/MessagePage'));
    const EventPage = lazy(() => import('../modules/apps/event/EventPage'));
    const CoursePage = lazy(()=>import('../modules/apps/course/CoursePage'));
    const AuthorPage = lazy(()=>import('../modules/apps/author/AuthorPage'));
    const MediaPage = lazy(()=>import('../modules/apps/media/MediaPage'));


    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>
                {/* Pages */}
                <Route path='dashboard' element={<DashboardWrapper/>}/>
                <Route path='builder' element={<BuilderPageWrapper/>}/>
                <Route path='menu-test' element={<MenuTestPage/>}/>
                {/* Lazy Modules */}
                <Route
                    path='crafted/pages/profile/*'
                    element={
                        <SuspensedView>
                            <ProfilePage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='crafted/pages/wizards/*'
                    element={
                        <SuspensedView>
                            <WizardsPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='crafted/widgets/*'
                    element={
                        <SuspensedView>
                            <WidgetsPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='crafted/account/*'
                    element={
                        <SuspensedView>
                            <AccountPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/chat/*'
                    element={
                        <SuspensedView>
                            <ChatPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/user-management/*'
                    element={
                        <SuspensedView>
                            <UsersPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/option-management/*'
                    element={
                        <SuspensedView>
                            <OptionPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/posts-management/*'
                    element={
                        <SuspensedView>
                            <PostsPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/tags-management/*'
                    element={
                        <SuspensedView>
                            <PostTagsPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/category-management/*'
                    element={
                        <SuspensedView>
                            <PostCategoryPage/>
                        </SuspensedView>
                    }/>
                <Route
                    path='apps/role-management/*'
                    element={
                        <SuspensedView>
                            <RolePage/>
                        </SuspensedView>
                    }/>
                <Route
                    path='apps/navigation-management/*'
                    element={
                        <SuspensedView>
                            <NavigationPage/>
                        </SuspensedView>
                    }/>
                <Route
                    path='apps/review-management/*'
                    element={
                        <SuspensedView>
                            <ReviewPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/message-management/*'
                    element={
                        <SuspensedView>
                            <MessagePage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/event-management/*'
                    element={
                        <SuspensedView>
                            <EventPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/course-management/*'
                    element={
                        <SuspensedView>
                            <CoursePage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/author-management/*'
                    element={
                        <SuspensedView>
                            <AuthorPage/>
                        </SuspensedView>
                    }
                />
                <Route
                    path={'apps/media-management/*'}
                    element={
                    <SuspensedView>
                        <MediaPage/>
                    </SuspensedView>
                        }
                />

                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
    const baseColor = getCSSVariableValue('--bs-primary')
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
}

export {PrivateRoutes}
