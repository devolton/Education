import clsx from 'clsx'
import {FC, PropsWithChildren, useMemo} from 'react'
import {HeaderProps} from 'react-table'
import {initialQueryState} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {User} from '../../core/_models'

type Props = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<User>>
}
const UserCustomHeader: FC<Props> = ({className, title, tableProps}) => {
  const fieldName = tableProps.column.id
  const {state, updateState} = useQueryRequest()

  const isSelectedForSorting = useMemo(() => {
    return state.sort && state.sort === fieldName
  }, [state, fieldName])
  const order: 'asc' | 'desc' | undefined = useMemo(() => state.order, [state])

  const sortColumn = () => {
    // avoid sorting for these columns
    if (fieldName === 'actions' || fieldName === 'selection') {
      return
    }

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

export {UserCustomHeader}
