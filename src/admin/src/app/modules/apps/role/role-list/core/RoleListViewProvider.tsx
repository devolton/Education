
/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext, useMemo, useEffect} from 'react'
import {
    ID,
    calculatedGroupingIsDisabled,
    calculateIsAllDataSelected,
    groupingOnSelect,
    initialListView,
    ListViewContextProps,
    groupingOnSelectAll,
    WithChildren,
} from '../../../../../../_metronic/helpers'
import {useRoleQueryResponseData, useRoleQueryResponseLoading} from "./RoleQueryResponseProvider.tsx";


const RoleListViewContext = createContext<ListViewContextProps>(initialListView)

const RoleListViewProvider: FC<WithChildren> = ({children}) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const isLoading = useRoleQueryResponseLoading();
    const data =  useRoleQueryResponseData()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    return (
        <RoleListViewContext.Provider
            value={{
                selected,
                itemIdForUpdate,
                setItemIdForUpdate,
                disabled,
                isAllSelected,
                onSelect: (id: ID) => {
                    groupingOnSelect(id, selected, setSelected)
                },
                onSelectAll: () => {
                    groupingOnSelectAll(isAllSelected, setSelected, data)
                },
                clearSelected: () => {
                    setSelected([])
                },
            }}
        >
            {children}
        </RoleListViewContext.Provider>
    )
}

const useRoleListView = () => useContext(RoleListViewContext)

export {RoleListViewProvider, useRoleListView}
