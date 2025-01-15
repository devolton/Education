/* eslint-disable react-hooks/exhaustive-deps */

import {FC, useEffect, useState} from 'react'
import {initialQueryState, KTIcon, QueryRequestContextProps, useDebounce} from "../../../../../../_metronic/helpers";

type Props ={
    useQueryRequest:()=>QueryRequestContextProps,
    fieldName:string
}

const ListHeaderSearch:FC<Props> = ({useQueryRequest,fieldName}) => {
    const {updateState} = useQueryRequest()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const debouncedSearchTerm = useDebounce(searchTerm, 150)
    // Effect for API call
    useEffect(
        () => {
            if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
                updateState({search: debouncedSearchTerm, ...initialQueryState})
            }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
        // More details about useDebounce: https://usehooks.com/useDebounce/
    )

    return (
        <div className='card-title'>
            {/* begin::Search */}
            <div className='d-flex align-items-center position-relative my-1'>
                <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
                <input
                    type='text'
                    data-kt-user-table-filter='search'
                    className='form-control form-control-solid w-250px ps-14'
                    placeholder={`Search ${fieldName}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/* end::Search */}
        </div>
    )
}

export {ListHeaderSearch}
