import {FC, useEffect, useMemo} from 'react'
import {ID} from "../../../../../../../_metronic/helpers";



type Props = {
    id: ID,
    selected:Array<number>,
    onSelect:(id:number)=>void
}

const SelectionCell: FC<Props> = ({id,selected,onSelect}) => {

    const isSelected = useMemo(() => selected.includes(id), [id, selected])
    return (
        <div className='form-check form-check-custom form-check-solid'>
            <input
                className='cursor-pointer form-check-input'
                type='checkbox'
                data-kt-check={isSelected}
                data-kt-check-target='#kt_table_users .form-check-input'
                checked={isSelected}
                onChange={() => onSelect(id)}
            />
        </div>
    )
}

export {SelectionCell}
