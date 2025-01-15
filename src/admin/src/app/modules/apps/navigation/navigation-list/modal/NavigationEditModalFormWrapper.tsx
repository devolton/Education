import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useEffect, useState} from "react";
import {useNavigationListView} from "../core/NavigationListViewProvider.tsx";
import {getNavigationById} from "../core/_navigation.request.ts";
import {initialNavigation, Navigation} from "../core/_navigation.model.ts";
import {NavigationEditModalForm} from "./NavigationEditModalForm.tsx";


const NavigationEditModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = useNavigationListView();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: navigation,
        error,
    } = useQuery(
        `${QUERIES.ONE_NAVIGATION}-${itemIdForUpdate}`,
        () => {
            return getNavigationById(itemIdForUpdate);

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
    useEffect(() => {

    }, [])

    if (!itemIdForUpdate) {
        let emptyNavigation:Navigation={
            id:initialNavigation.id,
            href:initialNavigation.href,
            title:initialNavigation.title,
            order:initialNavigation.order,
            parentId:initialNavigation.parentId
        }

        return <NavigationEditModalForm isLoading={isLoading} navigation={emptyNavigation}/>
    }

    if (!isLoading && !error && navigation) {
        return <NavigationEditModalForm isLoading={isLoading} navigation={navigation}/>
    }

    return null
}

export {NavigationEditModalFormWrapper}
