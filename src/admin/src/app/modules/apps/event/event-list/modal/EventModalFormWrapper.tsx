import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useEffect, useState} from "react";
import {useEventListView} from "../core/EventQueryListViewProvider.tsx";
import {getEventById} from "../core/_event.request.tsx";
import {initialEvent} from "../core/_event.model.ts";
import {EventEditModalForm} from "./EventEditModalForm.tsx";



const EventModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = useEventListView();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: event,
        error,
    } = useQuery(
        `${QUERIES.ONE_EVENT}-${itemIdForUpdate}`,
        () => {
            let event= getEventById(itemIdForUpdate);
            return event;

        },
        {
            cacheTime: 0,
            enabled: enabledQuery,
            onError: (err) => {
                setItemIdForUpdate(undefined)
                console.error(err)
            },
        }
    )

    if (!itemIdForUpdate) {
        let emptyEvent={
            ...initialEvent
        }
        return <EventEditModalForm isLoading={isLoading} event={emptyEvent}/>
    }

    if (!isLoading && !error && event) {
        return <EventEditModalForm isLoading={isLoading} event={event}/>
    }

    return null
}

export {EventModalFormWrapper}
