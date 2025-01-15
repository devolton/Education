import React, {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'

import {ID, KTIcon} from "../../../../../../../_metronic/helpers";
import {MenuComponent} from "../../../../../../../_metronic/assets/ts/components";
import {AxiosResponse} from "axios";


type Props = {
    id: ID,
    query: string,
    setItemIdForUpdate: React.Dispatch<React.SetStateAction<number>>,
    removeEntity?: (id) => Promise<AxiosResponse<any>>,
    queryKey?: string,
    isUpdated?: boolean
}

const ActionsCell: FC<Props> = ({id, query, setItemIdForUpdate, queryKey, removeEntity = null, isUpdated = true}) => {
    const queryClient = useQueryClient()

    useEffect(() => {
        MenuComponent.reinitialization()
    }, [])


    const openEditModal = () => {
        console.log("Action " + id);
        setItemIdForUpdate(id)
    }

    const deleteItem = useMutation(() => removeEntity(id), {
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            // ✅ update detail view directly
            queryClient.invalidateQueries([queryKey])
        },
    })

    return (
        <>
            <a
                href='#'
                className='btn btn-light btn-active-light-primary btn-sm'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
            >
                Actions
                <KTIcon iconName='down' className='fs-5 m-0'/>
            </a>
            {/* begin::Menu */}
            <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
                data-kt-menu='true'
            >
                {/* begin::Menu item */}
                {isUpdated && <div className='menu-item px-3'>
                    <a className='menu-link px-3' onClick={openEditModal}>
                        Edit
                    </a>
                </div>
                }
                {/* end::Menu item */}

                {/* begin::Menu item */}
                {removeEntity !== null && <div className='menu-item px-3'>
                    <a
                        className='menu-link px-3'
                        data-kt-users-table-filter='delete_row'
                        onClick={async () => await deleteItem.mutateAsync()}
                    >
                        Delete
                    </a>
                </div>
                }
                {/* end::Menu item */}
            </div>
            {/* end::Menu */}
        </>
    )
}

export {ActionsCell}
