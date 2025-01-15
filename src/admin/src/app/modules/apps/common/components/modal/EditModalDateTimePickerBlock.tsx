import * as React from 'react';
import dayjs from 'dayjs';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import {FC, useState} from "react";
import {FormikProps} from "formik";
import clsx from "clsx";

type Props ={
    title:string,
    dateTime:Date,
    fieldName:string,
    formik:FormikProps<any>,
    isLoading:boolean
}

const EditModalDateTimePickerBlock:FC<Props> = ({title, dateTime, formik, fieldName, isLoading}) => {
    const [value, setValue] = useState(dayjs(dateTime))
    const onChangeHandler = (newValue) => {
        let updatedDate:Date = new Date(newValue?.format('YYYY-MM-DD HH:mm:ss.SSSZ'));
        formik.values[fieldName]=updatedDate;
        setValue(newValue);
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[

                    'DesktopDateTimePicker',

                ]}
            >
                <label className='required fw-bold fs-6 mb-1'>{title}</label>
                    <MobileDateTimePicker value={value}
                                          onChange={onChangeHandler}

                  />


            </DemoContainer>
        </LocalizationProvider>
    );
}
export {EditModalDateTimePickerBlock}
