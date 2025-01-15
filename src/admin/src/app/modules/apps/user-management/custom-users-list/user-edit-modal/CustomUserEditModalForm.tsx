import {FC, useEffect, useState} from 'react'
import {editUserSchema} from "../common/custom.user.schema.ts";
import {useFormik} from 'formik'
import {isNotEmpty} from '../../../../../../_metronic/helpers'

import {UsersListLoading} from "../../users-list/components/loading/UsersListLoading.tsx";
import {CreateCustomUserDto, CustomUser, initialCustomUser, UpdateCustomUserDto} from "../core/custom.user.model.ts";
import {useListView} from "../core/CustomUserListViewProvider.tsx";
import {useQueryResponse} from "../core/CustomUserQueryResponseProvider.tsx";
import {CustomUserRoleRadioItem} from "./CustomUserRoleRadioItem.tsx";
import {
    addRoleToUser,
    createCustomUser,
    removeCustomUserAvatar,
    removeRoleFromUser,
    updateCustomUser,
    updateCustomUserAvatar
} from "../core/_userRequests.ts";
import {EditImageBlock, IImageProps} from "../../../common/components/modal/EditImageBlock.tsx";
import {EditModalInput} from "../../../common/components/modal/EditModalInput.tsx";
import {Role} from "../../../role/role-list/core/_role.model.ts";


type Props = {
    isUserLoading: boolean
    user: CustomUser,
    roles: Role[]
}




const CustomUserEditModalForm: FC<Props> = ({user, isUserLoading, roles}) => {
    const {setItemIdForUpdate} = useListView()
    const [selectedFile, setSelectedFile] = useState<File>(null);
    const {refetch} = useQueryResponse();
    const [rolesIdForUp, setRolesIdForUp] = useState<number[]>([])

    const [userForEdit] = useState<CustomUser>({
        ...user,
        password: '',
        name: user.name || initialCustomUser.name,
        email: user.email || initialCustomUser.email,
    })

    const imageProps:IImageProps={
        imagePath:user.avatarPath,
        initialPath:'/static/user/avatar/defaultAvatar.png',
        entityId:user.id
    }

    const cancel = (withRefresh?: boolean) => {
        if (withRefresh) {
            refetch()
        }
        setItemIdForUpdate(undefined)
    }
    const addRoleIdForUpdate = (roleId: number) => {
        let tempRoleIdForUp = [...rolesIdForUp, roleId];
        setRolesIdForUp(tempRoleIdForUp);

    }
    const removeRoleIdForUpdate = (roleId: number) => {
        if (rolesIdForUp.includes(roleId)) {
            let tempRoleIdForUp = rolesIdForUp.filter(oneId => oneId != roleId);
            setRolesIdForUp(tempRoleIdForUp);
        }

    }



    const formik = useFormik({
        initialValues: userForEdit,
        validationSchema: editUserSchema,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                if (isNotEmpty(values.id)) {
                    console.log(formik.values.password);
                    let userRoleIds = user.roles.map((oneRole) => oneRole.id);
                    let rolesIdForRemoving = userRoleIds.filter(oneId => !rolesIdForUp.includes(oneId));
                    let updateUserDto:UpdateCustomUserDto = {
                        name: values.name,
                        surname: values.surname,
                        middleName: values.middleName,
                        login: values.login

                    };
                    if (isNotEmpty(formik.values.password)) {
                        updateUserDto = {...updateUserDto, password: formik.values.password}
                        await updateCustomUser(userForEdit.id, updateUserDto);
                        await addRoleToUser(rolesIdForUp, user.id);
                        await removeRoleFromUser(rolesIdForRemoving, user.id);
                    }
                } else {
                    let createUserDto: CreateCustomUserDto = {
                        name: values.name,
                        surname: values.surname,
                        middleName: values.middleName,
                        login: values.login,
                        email: values.email,
                        avatarPath: values.avatarPath,
                        password: values.password
                    }
                    let createdUser: CustomUser = await createCustomUser(createUserDto, selectedFile);
                    await addRoleToUser(rolesIdForUp, createdUser.id);

                }
            } catch (ex) {
                console.error(ex)
            } finally {
                setSubmitting(true)
                cancel(true)
            }
        },
    })
    useEffect(() => {
        console.log("Roles:");
        console.log(roles);
        let tempArr = [];
        user.roles?.forEach((oneRole) => {
            tempArr.push(oneRole.id);
        })
        setRolesIdForUp(tempArr);
        return () => {
            setSelectedFile(null);
            refetch();
        }

    }, [])

    return (
        <>
            <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
                {/* begin::Scroll */}
                <div
                    className='d-flex flex-column scroll-y me-n7 pe-7'
                    id='kt_modal_add_user_scroll'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='auto'
                    data-kt-scroll-dependencies='#kt_modal_add_user_header'
                    data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                    data-kt-scroll-offset='300px'
                >
                    {/* begin::Input group */}
                    <EditImageBlock imageProps={imageProps}
                                    refetch={refetch}
                                    updateFunc={updateCustomUserAvatar}
                                    removeFunc={removeCustomUserAvatar}
                                    setSelectedFile={setSelectedFile}/>
                   <EditModalInput title={'Name'} formik={formik} fieldName={'name'}
                                                  isLoading={isUserLoading}/>
                    <EditModalInput title={'Email'} formik={formik} fieldName={'email'}
                                                  isLoading={isUserLoading}/>

                    <EditModalInput title={'Login'} formik={formik} fieldName={'login'}
                                                  isLoading={isUserLoading}/>
                    <EditModalInput title='Surname' formik={formik} fieldName={'surname'}
                                                  isLoading={isUserLoading}/>
                    <EditModalInput title={'Middle Name'} fieldName={'middleName'} formik={formik}
                                                  isLoading={isUserLoading}/>
                    <EditModalInput title={'Password'} fieldName={'password'} formik={formik}
                                                  isLoading={isUserLoading}/>


                    <div className='mb-7'>
                        <label className='required fw-bold fs-6 mb-5'>Role</label>


                        {
                            roles.map(oneRole => {
                                return <CustomUserRoleRadioItem key={oneRole.value + "-" + oneRole.id} formik={formik}
                                                                role={oneRole} addRole={addRoleIdForUpdate}
                                                                removeRole={removeRoleIdForUpdate}/>
                            })
                        }

                    </div>

                </div>
                {/* end::Scroll */}

                {/* begin::Actions */}
                <div className='text-center pt-15'>
                    <button
                        type='reset'
                        onClick={() => cancel()}
                        className='btn btn-light me-3'
                        data-kt-users-modal-action='cancel'
                        disabled={formik.isSubmitting || isUserLoading}
                    >
                        Discard
                    </button>

                    <button
                        type='submit'
                        className='btn btn-primary'
                        data-kt-users-modal-action='submit'
                        disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
                    >
                        <span className='indicator-label'>Submit</span>
                        {(formik.isSubmitting || isUserLoading) && (
                            <span className='indicator-progress'>
                Please wait...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
                        )}
                    </button>
                </div>
                {/* end::Actions */}
            </form>
            {(formik.isSubmitting || isUserLoading) && <UsersListLoading/>}
        </>
    )
}

export {CustomUserEditModalForm}
