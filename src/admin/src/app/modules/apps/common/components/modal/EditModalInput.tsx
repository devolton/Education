import React, { FC } from 'react';
import { FormikProps } from 'formik';
import clsx from 'clsx';

type Props = {
    title: string;
    fieldName: string;
    formik: FormikProps<any>;
    isLoading: boolean;
};

const EditModalInput:FC<Props> = ({ title, formik, fieldName, isLoading }) => {
    const error = formik.touched[fieldName] && formik.errors[fieldName];

    return (
        <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>{title}</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
                placeholder={String(fieldName)}
                {...formik.getFieldProps(fieldName as string)} // Приведение к строке для `FormikProps`
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    { 'is-invalid': error },
                    { 'is-valid': formik.touched[fieldName] && !formik.errors[fieldName] }
                )}
                type={fieldName === 'email' ? 'email' : 'text'}
                name={String(fieldName)}
                autoComplete='off'
                disabled={formik.isSubmitting || isLoading}
            />
            {/* end::Input */}
            {error && (
                <div className='fv-plugins-message-containe text-danger'>
                    <span role='alert'>{String(formik.errors[fieldName])}</span>
                </div>
            )}
        </div>
    );
};

export { EditModalInput };
