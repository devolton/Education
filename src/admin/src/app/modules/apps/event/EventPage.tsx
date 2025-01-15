import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../../_metronic/layout/core";
import {EventsListWrapper} from "./event-list/EventsList.tsx";


const eventsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Events Management',
        path: '/apps/event-management/events',
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


const EventPage = () => {

    return (<Routes>
            <Route element={<Outlet/>}>
                <Route
                    path='events'
                    element={
                        <>
                            <PageTitle breadcrumbs={eventsBreadcrumbs}>Events</PageTitle>
                            <EventsListWrapper/>
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/apps/event-management/events'/>}/>
        </Routes>
    )

}

export default EventPage;