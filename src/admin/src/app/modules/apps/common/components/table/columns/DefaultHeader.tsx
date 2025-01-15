import clsx from 'clsx'
import {FC, PropsWithChildren, useMemo} from 'react'
import {HeaderProps} from "react-table";
import {initialQueryState, QueryState} from "../../../../../../../_metronic/helpers";


type Props = {
    className?: string
    title?: string
    tableProps: PropsWithChildren<HeaderProps<any>>,
    state: QueryState,
    updateState: (updates: Partial<QueryState>) => void,
    ignoreSortFields: ReadonlyArray<string>
}
const DefaultHeader: FC<Props> = ({className, title, tableProps, state, updateState, ignoreSortFields}) => {
    const fieldName = tableProps.column.id

    const isSelectedForSorting = useMemo(() => {
        return state.sort && state.sort === fieldName
    }, [state, fieldName])
    const order: 'asc' | 'desc' | undefined = useMemo(() => state.order, [state])

    const sortColumn = () => {

        // avoid sorting for these columns
        if (ignoreSortFields.includes(fieldName))
            return;


        if (!isSelectedForSorting) {
            // enable sort asc
            updateState({sort: fieldName, order: 'asc', ...initialQueryState})
            return
        }

        if (isSelectedForSorting && order !== undefined) {
            if (order === 'asc') {
                // enable sort desc
                updateState({sort: fieldName, order: 'desc', ...initialQueryState})
                return
            }

            // disable sort
            updateState({sort: undefined, order: undefined, ...initialQueryState})
        }
    }

    return (
        <th
            {...tableProps.column.getHeaderProps()}
            className={clsx(
                className,
                isSelectedForSorting && order !== undefined && `table-sort-${order}`
            )}
            style={{cursor: 'pointer'}}
            onClick={sortColumn}
        >
                {title}
        </th>
    )
}

export {DefaultHeader}
