import React from 'react';
import clsx from "clsx";

const ChatMessage = ({message}) => {
    const state = message.type === 'in' ? 'info' : 'primary'
    return (
        <div
            className={clsx(
                'p-5 rounded',
                `bg-light-${state}`,
                'text-gray-900 fw-bold mw-lg-400px',
                `text-${message.type === 'in' ? 'start' : 'end'}`
            )}
            data-kt-element='message-text'
            dangerouslySetInnerHTML={{__html: message.text}}
        ></div>
    );
};

export default ChatMessage;