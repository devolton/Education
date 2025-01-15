/* eslint-disable react-refresh/only-export-components */
import {FC, useState, createContext, useContext, useMemo} from 'react'
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
import {useEventResponse, useEventResponseData} from "./EventQueryResponseProvider.tsx";

const EventQueryListViewContext = createContext<ListViewContextProps>(initialListView)

const EventQueryListViewProvider: FC<WithChildren> = ({children}) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const {isLoading} = useEventResponse()
    const data = useEventResponseData()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    return (
        <EventQueryListViewContext.Provider
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
        </EventQueryListViewContext.Provider>

    )
}

const useEventListView = () => useContext(EventQueryListViewContext)

export {EventQueryListViewProvider, useEventListView}
