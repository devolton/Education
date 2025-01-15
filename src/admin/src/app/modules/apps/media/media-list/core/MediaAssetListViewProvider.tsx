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
import {useMediaAssetResponse, useMediaAssetResponseData} from "./MediaAssetQueryResponseProvider.tsx";

const MediaAssetQueryListViewContext = createContext<ListViewContextProps>(initialListView)

const MediaAssetQueryListViewProvider: FC<WithChildren> = ({children}) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const {isLoading} = useMediaAssetResponse()
    const data = useMediaAssetResponseData()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    return (
        <MediaAssetQueryListViewContext.Provider
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
        </MediaAssetQueryListViewContext.Provider>

    )
}

const useMediaAssetListView = () => useContext(MediaAssetQueryListViewContext)

export {MediaAssetQueryListViewProvider, useMediaAssetListView}
