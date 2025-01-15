import {useState, FC, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {IProfileDetails, profileDetailsInitValues as initialValues} from '../SettingsModel'
import {useFormik} from 'formik'
import {ProfileDetailInputItem} from "./ProfileDetailInputItem.tsx";
import {useAuth} from "../../../../auth";

import {profileDetailsSchema} from "../_profile.detail.form.validation.schema.ts";
import {
    CUSTOM_API_URL, removeCustomUserAvatar,
    updateCustomUser, updateCustomUserAvatar
} from "../../../../apps/user-management/custom-users-list/core/_userRequests.ts";
import {
    UpdateCustomUserDto
} from "../../../../apps/user-management/custom-users-list/core/custom.user.model.ts";
import {EditImageBlock, IImageProps} from "../../../../apps/common/components/modal/EditImageBlock.tsx";
import {Config} from "../../../../../../env.config.ts";


const ProfileDetails: FC = () => {
    const {currentCustomUser, refetch} = useAuth()

    let avatarProps: IImageProps = {
        entityId: currentCustomUser.id,
        initialPath: Config.PATH.ASSETS.USER.DEFAULT_AVATAR,
        imagePath: currentCustomUser.avatarPath
    }
    const [loading, setLoading] = useState(false);
    let profileInitial: IProfileDetails = {
        avatarPath: currentCustomUser.avatarPath || initialValues.avatarPath,
        name: currentCustomUser.name || initialValues.name,
        surname: currentCustomUser.surname || initialValues.surname,
        middleName: currentCustomUser.middleName || initialValues.middleName,
        login: currentCustomUser.login || initialValues.login
    }
    const formik = useFormik<IProfileDetails>({
        initialValues: profileInitial,
        validationSchema: profileDetailsSchema,
        onSubmit: async (values) => {
            let updateUserDto: UpdateCustomUserDto = {
                name: values.name,
                surname: values.surname,
                middleName: values.middleName,
                login: values.login,
                password: null
            }
            await updateCustomUser(currentCustomUser.id, updateUserDto);
            refetch();

        },
    })

    return (
        <div className='card mb-5 mb-xl-10'>
            <div
                className='card-header border-0 cursor-pointer'
                role='button'
                data-bs-toggle='collapse'
                data-bs-target='#kt_account_profile_details'
                aria-expanded='true'
                aria-controls='kt_account_profile_details'
            >
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Profile Details</h3>
                </div>
            </div>

            <div id='kt_account_profile_details' className='collapse show'>
                <form onSubmit={formik.handleSubmit} noValidate className='form'>
                    <div className='card-body border-top p-9'>
                        <EditImageBlock imageProps={avatarProps}
                                        refetch={refetch}
                                        updateFunc={updateCustomUserAvatar}
                                        removeFunc={removeCustomUserAvatar}/>

                        <ProfileDetailInputItem title={'Surname'} field={'surname'} formik={formik}/>
                        <ProfileDetailInputItem title={'Name'} field={'name'} formik={formik}/>
                        <ProfileDetailInputItem title={'Middle name'} field={'middleName'} formik={formik}/>
                        <ProfileDetailInputItem title={'Login'} field={'login'} formik={formik}/>


                        <div className='card-footer d-flex justify-content-end py-6 px-9'>
                            <button type='submit' className='btn btn-primary' disabled={loading}>
                                {!loading && 'Save Changes'}
                                {loading && (
                                    <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export {
    ProfileDetails
}
