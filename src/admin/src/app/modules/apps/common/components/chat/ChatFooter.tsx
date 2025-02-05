import React, {FC} from 'react';

type Props = {
    sendMessageHandler:()=>void
}

const ChatFooter:FC<Props> = ({sendMessageHandler}) => {
    return (
        <div className='d-flex flex-stack'>
            <div className='d-flex align-items-center me-2'>
                <button
                    className='btn btn-sm btn-icon btn-active-light-primary me-1'
                    type='button'
                    data-bs-toggle='tooltip'
                    title='Coming soon'
                >
                    <i className='bi bi-paperclip fs-3'></i>
                </button>
                <button
                    className='btn btn-sm btn-icon btn-active-light-primary me-1'
                    type='button'
                    data-bs-toggle='tooltip'
                    title='Coming soon'
                >
                    <i className='bi bi-upload fs-3'></i>
                </button>
            </div>
            <button
                className='btn btn-primary'
                type='button'
                data-kt-element='send'
                onClick={sendMessageHandler}
            >
                Send
            </button>
        </div>
    );
};

export default ChatFooter;