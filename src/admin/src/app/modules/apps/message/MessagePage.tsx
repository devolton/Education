import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {MessageListWrapper} from "./message-list/MessageList.tsx";


const messageBreadcrumbs: Array<PageLink> = [
    {
        title: 'Messages Management',
        path: '/apps/message-management/messages',
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


const MessagePage = () => {

    return (<Routes>
            <Route element={<Outlet/>}>
                <Route
                    path='messages'
                    element={
                        <>
                            <PageTitle breadcrumbs={messageBreadcrumbs}>Messages</PageTitle>
                            <MessageListWrapper/>
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/apps/message-management/messages'/>}/>
        </Routes>
    )

}

export default MessagePage;