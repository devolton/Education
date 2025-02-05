import React from 'react';
import {toAbsoluteUrl} from "../../../../../../_metronic/helpers";

const OneUserChat = () => {
    return (
        <div>
            <div className='d-flex flex-stack py-4'>
                <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px symbol-circle'>
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
                        <div className='symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2'></div>
                    </div>

                    <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                            Max Smith
                        </a>
                        <div className='fw-bold text-gray-500'>max@kt.com</div>
                    </div>
                </div>

                <div className='d-flex flex-column align-items-end ms-2'>
                    <span className='text-muted fs-7 mb-1'>20 hrs</span>
                    <span className='badge badge-sm badge-circle badge-light-success'>6</span>
                </div>
            </div>

            <div className='separator separator-dashed d-none'></div>
            
        </div>
    );
};

export default OneUserChat;