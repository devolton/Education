import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";

import {ID, isNotEmpty, toAbsoluteUrl} from "../../../../../../_metronic/helpers";
import {CUSTOM_API_URL} from "../../../user-management/custom-users-list/core/_userRequests.ts";

export  interface IImageProps{
    entityId:ID,
    imagePath:string,
    initialPath:string
}

type Props={
    imageProps:IImageProps,
    setSelectedFile?:Dispatch<SetStateAction<File>>,
    title?:string,
    refetch:()=>void,
    updateFunc:(ID,File)=>void,
    removeFunc:(ID)=>void,
    width?:number,
    height?:number
}

const EditImageBlock:FC<Props>= ({imageProps,refetch,updateFunc,removeFunc,setSelectedFile=null,title='Avatar',width=150,height=150})=>{
    const blankImg = toAbsoluteUrl('media/svg/avatars/blank.svg')
    const [isRemoveAvatarVisible, setIsRemoveAvatarVisible] = useState(false)
    const [userAvatarImg, setUserAvatarImg] = useState(CUSTOM_API_URL + imageProps.imagePath);

    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile: File = e.target.files?.[0];
        if (selectedFile) {
            setUserAvatarImg(URL.createObjectURL(selectedFile));
        }
        if (isNotEmpty(imageProps.entityId)) {
            updateFunc(imageProps.entityId, selectedFile)
        }
        else {
            setSelectedFile(selectedFile);
        }
        refetch();
    }
    const removeAvatar = () => {
        removeFunc(imageProps.entityId)

    }
    useEffect(()=>{
        setIsRemoveAvatarVisible(imageProps.imagePath!==imageProps.initialPath);

    },[])

    return (
        <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='d-block fw-bold fs-6 mb-5'>{title}</label>
            {/* end::Label */}

            {/* begin::Image input */}
            <div
                className='image-input image-input-outline'
                data-kt-image-input='true'
                style={{backgroundImage: `url('${blankImg}')`}}
            >
                {/* begin::Preview existing avatar */}
                <div
                    className={`image-input-wrapper bgi-no-repeat shadow rounded bgi-position-center w-${width}px h-${height}px`}
                    style={{backgroundImage: `url('${userAvatarImg}')`,backgroundSize:'contain'}}
                ></div>
                {/* end::Preview existing avatar */}

                {/* begin::Label */}
                <label
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='change'
                    data-bs-toggle='tooltip'
                    title='Change avatar'
                >
                    <i className='bi bi-pencil-fill fs-7'></i>

                    <input type='file' name='avatar' accept='.png, .jpg, .jpeg' onChange={(event) => {
                        selectFile(event)
                    }}/>
                    <input type='hidden' name='avatar_remove'/>
                </label>
                {/* end::Label */}

                {/* begin::Cancel */}
                <span
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='cancel'
                    data-bs-toggle='tooltip'
                    title='Cancel avatar'
                >
              <i className='bi bi-x fs-2'></i>
            </span>
                {/* end::Cancel */}

                {/* begin::Remove */}
                {isRemoveAvatarVisible && <span
                    className={`btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow`}
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    title='Remove avatar'
                    onClick={() => {
                        removeAvatar()
                    }}
                >
                              <i className='bi bi-x fs-2'></i>
                            </span>
                }
                {/* end::Remove */}
            </div>
        </div>
    )
}
export {EditImageBlock};