import {useEffect} from 'react'
import {EditModalHeader} from "../../../common/components/modal/EditModalHeader.tsx";
import {useCourseViewList} from "../core/CourseViewListProvider.tsx";
import {CourseFormWrapper} from "./CourseFormWrapper.tsx";


const CourseModal = () => {
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
                        <EditModalHeader title={'course'} useViewListHook={useCourseViewList}/>
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            <CourseFormWrapper/>
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

export {CourseModal}
