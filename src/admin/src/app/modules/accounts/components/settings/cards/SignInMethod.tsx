import {useState, FC} from 'react'
import {KTIcon} from '../../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import {loginFormValidationSchema} from "../_login.update.form.validation.schema.ts";
import {passwordFormValidationSchema} from "../password.update.form.validation.schema.ts";
import {IUpdateLogin, IUpdatePassword, updateLogin, updatePassword} from '../SettingsModel'
import {useAuth} from "../../../../auth";
import {
    updateCustomUserLogin, updateCustomUserPassword
} from "../../../../apps/user-management/custom-users-list/core/_userRequests.ts";
import {CustomUser} from "../../../../apps/user-management/custom-users-list/core/custom.user.model.ts";


const SignInMethod: FC = () => {
    const {currentCustomUser, refetch} = useAuth();
    const [loginUpdateData, setLoginUpdateData] = useState<IUpdateLogin>(updateLogin)
    const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)

    const [showEmailForm, setShowEmailForm] = useState<boolean>(false)
    const [showPasswordForm, setPasswordForm] = useState<boolean>(false)

    const [loading1, setLoading1] = useState(false)

    const formik1 = useFormik<IUpdateLogin>({
        initialValues: {
            ...loginUpdateData,
            newLogin: currentCustomUser.login
        },
        validationSchema: loginFormValidationSchema,
        onSubmit: async (values) => {
            let updatePasswordObj: IUpdateLogin = {
                newLogin: values.newLogin,
                confirmPassword: values.confirmPassword
            }
            setLoading1(true)
            let updateRes = await updateCustomUserLogin(currentCustomUser.id, updatePasswordObj);
            setLoading1(false)
            if (updateRes.data) {
                refetch();
                setShowEmailForm(false);
            }


        },
    })

    const [loading2, setLoading2] = useState(false)

    const formik2 = useFormik<IUpdatePassword>({
        initialValues: {
            ...passwordUpdateData,
        },
        validationSchema: passwordFormValidationSchema,
        onSubmit: async (values) => {
            if (values.newPassword == values.passwordConfirmation) {
                let passwordObj = {
                    password: values.currentPassword,
                    newPassword: values.newPassword
                }
                setLoading2(true);
                let response = await updateCustomUserPassword(currentCustomUser.id, passwordObj);
                console.log(response);
                setLoading2(false);
                setPasswordForm(false);
            }
        },
    })

    return (
        <div className='card mb-5 mb-xl-10'>
            <div
                className='card-header border-0 cursor-pointer'
                role='button'
                data-bs-toggle='collapse'
                data-bs-target='#kt_account_signin_method'
            >
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Sign-in</h3>
                </div>
            </div>

            <div id='kt_account_signin_method' className='collapse show'>
                <div className='card-body border-top p-9'>
                    <div className='d-flex flex-wrap align-items-center'>
                        <div id='kt_signin_email' className={' ' + (showEmailForm && 'd-none')}>
                            <div className='fs-6 fw-bolder mb-1'>Login</div>
                            <div className='fw-bold text-gray-600'>{currentCustomUser.login}</div>
                        </div>

                        <div
                            id='kt_signin_email_edit'
                            className={'flex-row-fluid ' + (!showEmailForm && 'd-none')}
                        >
                            <form
                                onSubmit={formik1.handleSubmit}
                                id='kt_signin_change_email'
                                className='form'
                                noValidate
                            >
                                <div className='row mb-6'>
                                    <div className='col-lg-6 mb-4 mb-lg-0'>
                                        <div className='fv-row mb-0'>
                                            <label htmlFor='login' className='form-label fs-6 fw-bolder mb-3'>
                                                Enter New Login
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control form-control-lg form-control-solid'
                                                id='login'
                                                placeholder='Login'
                                                {...formik1.getFieldProps('newLogin')}
                                            />
                                            {formik1.touched.newLogin && formik1.errors.newLogin && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>{formik1.errors.newLogin}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='fv-row mb-0'>
                                            <label
                                                htmlFor='confirmemailpassword'
                                                className='form-label fs-6 fw-bolder mb-3'
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                type='password'
                                                className='form-control form-control-lg form-control-solid'
                                                id='confirmemailpassword'
                                                {...formik1.getFieldProps('confirmPassword')}
                                            />
                                            {formik1.touched.confirmPassword && formik1.errors.confirmPassword && (
                                                <div className='fv-plugins-message-container'>
                                                    <div
                                                        className='fv-help-block'>{formik1.errors.confirmPassword}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <button
                                        id='kt_signin_submit'
                                        type='submit'
                                        className='btn btn-primary  me-2 px-6'
                                    >
                                        {!loading1 && 'Update Email'}
                                        {loading1 && (
                                            <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                                                <span
                                                    className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                                        )}
                                    </button>
                                    <button
                                        id='kt_signin_cancel'
                                        type='button'
                                        onClick={() => {
                                            setShowEmailForm(false)
                                        }}
                                        className='btn btn-color-gray-500 btn-active-light-primary px-6'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div id='kt_signin_email_button' className={'ms-auto ' + (showEmailForm && 'd-none')}>
                            <button
                                onClick={() => {
                                    setShowEmailForm(true)
                                }}
                                className='btn btn-light btn-active-light-primary'
                            >
                                Change Login
                            </button>
                        </div>
                    </div>

                    <div className='separator separator-dashed my-6'></div>

                    <div className='d-flex flex-wrap align-items-center mb-10'>
                        <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
                            <div className='fs-6 fw-bolder mb-1'>Password</div>
                        </div>

                        <div
                            id='kt_signin_password_edit'
                            className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
                        >
                            <form
                                onSubmit={formik2.handleSubmit}
                                id='kt_signin_change_password'
                                className='form'
                                noValidate
                            >
                                <div className='row mb-1'>
                                    <div className='col-lg-4'>
                                        <div className='fv-row mb-0'>
                                            <label htmlFor='currentpassword' className='form-label fs-6 fw-bolder mb-3'>
                                                Current Password
                                            </label>
                                            <input
                                                type='password'
                                                className='form-control form-control-lg form-control-solid '
                                                id='currentpassword'
                                                {...formik2.getFieldProps('currentPassword')}
                                            />
                                            {formik2.touched.currentPassword && formik2.errors.currentPassword && (
                                                <div className='fv-plugins-message-container'>
                                                    <div
                                                        className='fv-help-block'>{formik2.errors.currentPassword}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='col-lg-4'>
                                        <div className='fv-row mb-0'>
                                            <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
                                                New Password
                                            </label>
                                            <input
                                                type='password'
                                                className='form-control form-control-lg form-control-solid '
                                                id='newpassword'
                                                {...formik2.getFieldProps('newPassword')}
                                            />
                                            {formik2.touched.newPassword && formik2.errors.newPassword && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>{formik2.errors.newPassword}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='col-lg-4'>
                                        <div className='fv-row mb-0'>
                                            <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
                                                Confirm New Password
                                            </label>
                                            <input
                                                type='password'
                                                className='form-control form-control-lg form-control-solid '
                                                id='confirmpassword'
                                                {...formik2.getFieldProps('passwordConfirmation')}
                                            />
                                            {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
                                                <div className='fv-plugins-message-container'>
                                                    <div
                                                        className='fv-help-block'>{formik2.errors.passwordConfirmation}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='form-text mb-5'>
                                    Password must be at least 8 character and contain symbols
                                </div>

                                <div className='d-flex'>
                                    <button
                                        id='kt_password_submit'
                                        type='submit'
                                        className='btn btn-primary me-2 px-6'
                                    >
                                        {!loading2 && 'Update Password'}
                                        {loading2 && (
                                            <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                                                <span
                                                    className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPasswordForm(false)
                                        }}
                                        id='kt_password_cancel'
                                        type='button'
                                        className='btn btn-color-gray-500 btn-active-light-primary px-6'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div
                            id='kt_signin_password_button'
                            className={'ms-auto ' + (showPasswordForm && 'd-none')}
                        >
                            <button
                                onClick={() => {
                                    setPasswordForm(true)
                                }}
                                className='btn btn-light btn-active-light-primary'
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>

                    <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed p-6'>
                        <KTIcon iconName='shield-tick' className='fs-2tx text-primary me-4'/>
                        <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
                            <div className='mb-3 mb-md-0 fw-bold'>
                                <h4 className='text-gray-800 fw-bolder'>Secure Your Account</h4>
                                <div className='fs-6 text-gray-600 pe-7'>
                                    Two-factor authentication adds an extra layer of security to your account. To log
                                    in, in addition you'll need to provide a 6 digit code
                                </div>
                            </div>
                            <a
                                type={'button'}
                                className='btn btn-primary px-6 align-self-center text-nowrap'
                                data-bs-toggle='modal'
                                data-bs-target='#kt_modal_two_factor_authentication'
                            >
                                Enable
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {SignInMethod}
