import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useEffect, useState} from "react";
import {useRoleListView} from "../core/RoleListViewProvider.tsx";
import {getRoleById} from "../core/_role.request.ts";
import {initialRole, Role} from "../core/_role.model.ts";
import {RoleEditModalForm} from "./RoleEditModalForm.tsx";


const RoleEditModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = useRoleListView();
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: role,
        error,
    } = useQuery(
        `${QUERIES.ONE_ROLE}-${itemIdForUpdate}`,
        () => {
            return getRoleById(itemIdForUpdate);

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
        let emptyRole: Role = {
            id: initialRole.id,
            value: initialRole.value,
            description:initialRole.description

        }
        return <RoleEditModalForm isLoading={isLoading} role={emptyRole}/>
    }

    if (!isLoading && !error && role) {
        return <RoleEditModalForm isLoading={isLoading} role={role}/>
    }

    return null
}

export {RoleEditModalFormWrapper}
