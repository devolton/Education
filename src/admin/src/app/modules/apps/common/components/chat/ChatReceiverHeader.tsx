import React, {FC} from 'react';
import {toDevoltonAbsoluteUrl} from "../../../../../../_metronic/helpers";
import {ChatMessageModel} from "../../../chat/core/_chat.model.ts";

type Props = {
    message:ChatMessageModel
}
const ChatReceiverHeader:FC<Props> = ({message}) => {

    return (
        <>
            <div className='symbol symbol-35px symbol-circle '>
                <img alt='Pic' src={toDevoltonAbsoluteUrl(message.sender.avatarPath)} />
            </div>
            <div className='ms-3'>
                <a
                    href='#'
                    className='fs-5 fw-bolder text-gray-900 text-hover-primary me-1'
                >
                    {`${message.sender.surname} ${message.sender.name}`}
                </a>
                <span className='text-muted fs-7 mb-1'>{message.time}</span>
            </div>
        </>
    );
};

export default ChatReceiverHeader;