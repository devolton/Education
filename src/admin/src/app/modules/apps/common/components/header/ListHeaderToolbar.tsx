
import {KTIcon, ListViewContextProps} from "../../../../../../_metronic/helpers";
import {FC} from "react";


type Props={
    useListView :()=>ListViewContextProps,
    fieldName:string
}



const ListHeaderToolbar:FC<Props> = ({useListView,fieldName}) => {
    const {setItemIdForUpdate} = useListView()
    const openAddUserModal = () => {
        setItemIdForUpdate(null)
    }

    return (
        <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>

            {/* begin::Add user */}
            <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
                <KTIcon iconName='plus' className='fs-2' />
                Add {fieldName}
            </button>
            {/* end::Add user */}
        </div>
    )
}

export {ListHeaderToolbar}
