import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Private} from './components/Private'
import {Group} from './components/Group'
import {Drawer} from './components/Drawer'
import {useEffect} from "react";

import {connect} from "socket.io-client";
import {useAuth} from "../../auth";

const chatBreadCrumbs: Array<PageLink> = [
    {
        title: 'Chat',
        path: '/apps/chat/private-chat',
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

const ChatPage = () => {
    const {currentCustomUser} = useAuth();
    const socket = connect("http://localhost:3001",{
        query:{login:currentCustomUser.login},
    });

    useEffect(() => {
        socket.emit('message', {
            senderLogin:"johndoe",
            receiverLogin:"gamilc",
            message:"Its my first chat message!"
        });

        socket.on('message', (data: string) => {
            console.log(data);
        });
        return (() => {
            socket.disconnect();
        });

    }, [])


    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    path='private-chat'
                    element={
                        <>
                            <PageTitle breadcrumbs={chatBreadCrumbs}>Private chat</PageTitle>
                            <Private/>
                        </>
                    }
                />
                <Route
                    path='group-chat'
                    element={
                        <>
                            <PageTitle breadcrumbs={chatBreadCrumbs}>Group chat</PageTitle>
                            <Group/>
                        </>
                    }
                />
                {/*<Route*/}
                {/*    path='drawer-chat'*/}
                {/*    element={*/}
                {/*        <>*/}
                {/*            <PageTitle breadcrumbs={chatBreadCrumbs}>Drawer chat</PageTitle>*/}
                {/*            <Drawer/>*/}
                {/*        </>*/}
                {/*    }*/}
                {/*/>*/}
                <Route index element={<Navigate to='/apps/chat/private-chat'/>}/>
            </Route>
        </Routes>
    )
}

export default ChatPage
