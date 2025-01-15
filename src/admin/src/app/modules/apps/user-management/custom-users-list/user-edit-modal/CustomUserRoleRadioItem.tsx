import React, {FC, useEffect, useState} from 'react';
import {FormikProps} from "formik";
import {CustomUser} from "../core/custom.user.model.ts";
import {Role} from "../../../role/role-list/core/_role.model.ts";

type Props = {
    formik: FormikProps<CustomUser>
    role: Role,
    addRole: (roleId: number) => void,
    removeRole: (roleId) => void


}

const CustomUserRoleRadioItem: FC<Props> = ({formik, role, addRole, removeRole}) => {
    const [updateRoleTitle,setUpdateRoleTitle] =useState<string>( role.value);
    const [checkState, setCheckState] = useState(false)


    const changeCheckState = () => {
        (!checkState) ? addRole(role.id):removeRole(role.id);
        setCheckState(!checkState);
    }
    useEffect(() => {
        setUpdateRoleTitle(role.value.charAt(0).toUpperCase() + role.value.slice(1));
        let isCheck = formik.values.roles?.some(oneRole => oneRole.value === role.value)
        setCheckState(isCheck);

    }, [])
    return (
        <div>
            <div className='d-flex fv-row'>
                {/* begin::Radio */}
                <div className='form-check form-check-custom form-check-solid'>
                    {/* begin::Input */}
                    <input
                        className='form-check-input me-3 cursor-pointer'
                        {...formik.getFieldProps('roles')}
                        name={'role-' + role.value}
                        type='radio'
                        value={role.value}
                        onClick={(e) => {
                            changeCheckState()
                        }}
                        checked={checkState}
                        disabled={formik.isSubmitting}
                    />

                    {/* end::Input */}
                    {/* begin::Label */}
                    <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                        <div className='fw-bolder text-gray-800'>{updateRoleTitle}</div>
                        <div className='text-gray-600'>
                            {role.description}
                        </div>
                    </label>
                    {/* end::Label */}
                </div>
                {/* end::Radio */}
            </div>
            {/* end::Input row */}
            <div className='separator separator-dashed my-5'></div>
        </div>
    );
};

export {CustomUserRoleRadioItem};