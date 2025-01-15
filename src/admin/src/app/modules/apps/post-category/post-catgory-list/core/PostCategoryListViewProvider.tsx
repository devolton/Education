
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
import {
    usePostCategoryQueryResponseData,
    usePostCategoryQueryResponseLoading
} from "./PostCategoryQueryResponseProvider.tsx";


const PostCategoryListViewContext = createContext<ListViewContextProps>(initialListView)

const PostCategoryListViewProvider: FC<WithChildren> = ({children}) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const isLoading = usePostCategoryQueryResponseLoading();
    const data =  usePostCategoryQueryResponseData()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    return (
        <PostCategoryListViewContext.Provider
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
        </PostCategoryListViewContext.Provider>
    )
}

const usePostCategoryListView = () => useContext(PostCategoryListViewContext)

export {PostCategoryListViewProvider, usePostCategoryListView}
