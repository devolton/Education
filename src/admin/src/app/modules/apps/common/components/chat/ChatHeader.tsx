import React from 'react';

const ChatHeader = () => {

    return (
        <div className='card-header' id='kt_chat_messenger_header'>
            <div className='card-title'>
                <div className='symbol-group symbol-hover'></div>
                <div className='d-flex justify-content-center flex-column me-3'>
                    <a
                        href='#'
                        className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1'
                    >
                        Brian Cox
                    </a>

                    <div className='mb-0 lh-1'>
                        <span className='badge badge-success badge-circle w-10px h-10px me-1'></span>
                        <span className='fs-7 fw-bold text-gray-500'>Active</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChatHeader;