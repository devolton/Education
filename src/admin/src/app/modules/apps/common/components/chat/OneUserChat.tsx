import React, {FC} from 'react';
import {toDevoltonAbsoluteUrl} from "../../../../../../_metronic/helpers";
import {CustomUser} from "../../../user-management/custom-users-list/core/custom.user.model.ts";
import {useSocket} from "../../../chat/core/ChatMessageSocketProvider.tsx";

type Props = {
    user:CustomUser,
    onClickHandler:(user:CustomUser) => void,
}
const OneUserChat:FC<Props> = ({user,onClickHandler}) => {
    return (
        <div>
            <div onClick={()=>{onClickHandler(user)}} className='cursor-pointer d-flex flex-stack py-4'>
                <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px symbol-circle'>
                        <img alt='Pic' src={toDevoltonAbsoluteUrl(user.avatarPath)} />
                        <div className='symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2'></div>
                    </div>

                    <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                            {`${user.surname} ${user.name}`}
                        </a>
                        <div className='fw-bold text-gray-500'>{user.login}</div>
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