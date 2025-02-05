import React, {FC} from 'react';
import {MessageModel, toDevoltonAbsoluteUrl} from "../../../../../../_metronic/helpers";
import {useAuth} from "../../../../auth";

 type Props={
    message:MessageModel
}
const ChatSenderHeader:FC<Props> = ({message}) => {
    const {currentCustomUser} = useAuth();
    return (
        <>
            <div className='me-3'>
                <span className='text-muted fs-7 mb-1'>{message.time}</span>
                <a
                    href='#'
                    className='fs-5 fw-bolder text-gray-900 text-hover-primary ms-1'
                >
                    You
                </a>
            </div>
            <div className='symbol  symbol-35px symbol-circle '>
                <img alt='Pic' src={toDevoltonAbsoluteUrl(currentCustomUser.avatarPath)} />
            </div>
        </>
    );
};

export default ChatSenderHeader;