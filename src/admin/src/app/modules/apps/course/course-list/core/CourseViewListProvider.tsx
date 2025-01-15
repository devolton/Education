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
import {useCourseResponse, useCourseResponseData} from "./CourseQueryResponseProvider.tsx";

const CourseQueryListViewContext = createContext<ListViewContextProps>(initialListView)

const CourseQueryListViewProvider: FC<WithChildren> = ({children}) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const {isLoading} = useCourseResponse()
    const data = useCourseResponseData()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    return (
        <CourseQueryListViewContext.Provider
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
        </CourseQueryListViewContext.Provider>

    )
}

const useCourseViewList = () => useContext(CourseQueryListViewContext)

export {CourseQueryListViewProvider, useCourseViewList}
