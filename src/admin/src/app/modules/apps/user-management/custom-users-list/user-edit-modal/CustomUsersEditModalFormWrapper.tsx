import {useQuery} from 'react-query'

import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from "../core/CustomUserListViewProvider.tsx";
import {CustomUserEditModalForm} from "./CustomUserEditModalForm.tsx";
import {useEffect, useState} from "react";
import {CustomUser, initialCustomUser, UpdateCustomUserDto} from "../core/custom.user.model.ts";
import {getAllRoles, getCustomUserById} from "../core/_userRequests.ts";

const CustomUsersEditModalFormWrapper = () => {
    const {itemIdForUpdate, setItemIdForUpdate} = useListView();
    const [roles,setRoles] = useState([]);
    const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
    const {
        isLoading,
        data: user,
        error,
    } = useQuery(
        `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
        () => {
            return  getCustomUserById(itemIdForUpdate);

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
    useEffect(()=>{
        getAllRoles().then(res=>{
            setRoles(res.data);
        });

    },[])

    if (!itemIdForUpdate) {
        let emptyUser :CustomUser = {
            id:initialCustomUser.id,
            login:initialCustomUser.login,
            email:initialCustomUser.email,
            name:initialCustomUser.name,
            surname:initialCustomUser.surname,
            middleName:initialCustomUser.middleName,
            avatarPath:initialCustomUser.avatarPath,
            password:initialCustomUser.password

        }
        return <CustomUserEditModalForm isUserLoading={isLoading} user={emptyUser} roles={roles}/>
    }

    if (!isLoading && !error && user) {
        return <CustomUserEditModalForm isUserLoading={isLoading} user={user} roles={roles}/>
    }

    return null
}

export {CustomUsersEditModalFormWrapper}
