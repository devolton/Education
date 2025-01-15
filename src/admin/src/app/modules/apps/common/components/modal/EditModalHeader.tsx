import {KTIcon} from '../../../../../../_metronic/helpers'

type Props ={
    title:string,
    useViewListHook:()=>void
}
const EditModalHeader = ({title,useViewListHook}) => {
    const {itemIdForUpdate,setItemIdForUpdate} = useViewListHook();

    return (
        <div className='modal-header'>
            {/* begin::Modal title */}
            <h2 className='fw-bolder'>{(itemIdForUpdate)? `Update ${title}` : `Add ${title}`}</h2>
            {/* end::Modal title */}

            {/* begin::Close */}
            <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => setItemIdForUpdate(undefined)}
                style={{cursor: 'pointer'}}
            >
                <KTIcon iconName='cross' className='fs-1' />
            </div>
            {/* end::Close */}
        </div>
    )
}

export {EditModalHeader}
