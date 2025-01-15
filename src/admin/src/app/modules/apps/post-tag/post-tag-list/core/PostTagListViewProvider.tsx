
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
import {usePostTagQueryResponseData, usePostTagQueryResponseLoading} from "./PostTagResponseProvider.tsx";


const PostTagListViewContext = createContext<ListViewContextProps>(initialListView)

const PostTagListViewProvider: FC<WithChildren> = ({children}) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const isLoading = usePostTagQueryResponseLoading();
    const data =  usePostTagQueryResponseData()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    return (
        <PostTagListViewContext.Provider
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
        </PostTagListViewContext.Provider>
    )
}

const usePostTagListView = () => useContext(PostTagListViewContext)

export {PostTagListViewProvider, usePostTagListView}
