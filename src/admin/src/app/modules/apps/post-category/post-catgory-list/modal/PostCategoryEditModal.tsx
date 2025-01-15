import {useEffect} from 'react'
import {PostCategoryEditModalFormWrapper} from "./PostCategoryEditModalFormWrapper.tsx";
import {EditModalHeader} from "../../../common/components/modal/EditModalHeader.tsx";
import {usePostCategoryListView} from "../core/PostCategoryListViewProvider.tsx";



const PostCategoryEditModal = () => {
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
                        <EditModalHeader title={'category'} useViewListHook={usePostCategoryListView}/>
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            <PostCategoryEditModalFormWrapper/>
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

export {PostCategoryEditModal}
