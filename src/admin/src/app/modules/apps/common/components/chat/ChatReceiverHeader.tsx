import React, {FC} from 'react';
import {MessageModel, toAbsoluteUrl, UserInfoModel} from "../../../../../../_metronic/helpers";

type Props = {
    message:MessageModel,
    userInfo:UserInfoModel
}
const ChatReceiverHeader:FC<Props> = ({message,userInfo}) => {

    return (
        <>
            <div className='symbol symbol-35px symbol-circle '>
                <img alt='Pic' src={toAbsoluteUrl(`media/${userInfo.avatar}`)} />
            </div>
            <div className='ms-3'>
                <a
                    href='#'
                    className='fs-5 fw-bolder text-gray-900 text-hover-primary me-1'
                >
                    {userInfo.name}
                </a>
                <span className='text-muted fs-7 mb-1'>{message.time}</span>
            </div>
        </>
    );
};

export default ChatReceiverHeader;