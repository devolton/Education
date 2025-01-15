import {useEffect} from 'react'
import {EditModalHeader} from "../../../common/components/modal/EditModalHeader.tsx";
import {useMediaAssetListView} from "../core/MediaAssetListViewProvider.tsx";
import {MediaAssetModalFormWrapper} from "./MediaAssetModalFormWrapper.tsx";


const MediaAssetModal = () => {
    useEffect(() => {
        document.body.classList.add('modal-open')
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [])

    return (
        <>
            <div
                className='modal fade show d-block'
                id='kt_modal_add_user'
                role='dialog'
                tabIndex={-1}
                aria-modal='true'
            >
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-650px'>
                    {/* begin::Modal content */}
                    <div className='modal-content'>
                        <EditModalHeader title={'media asset'} useViewListHook={useMediaAssetListView}/>
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            <MediaAssetModalFormWrapper/>
                        </div>
                        {/* end::Modal body */}
                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show'></div>
            {/* end::Modal Backdrop */}
        </>
    )
}

export {MediaAssetModal}
