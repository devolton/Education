import * as React from 'react';
import dayjs from 'dayjs';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {FC, useState} from "react";
import {FormikProps} from "formik";
import {MobileTimePicker} from "@mui/x-date-pickers";

type Props ={
    title:string,
    time:string,
    fieldName:string,
    formik:FormikProps<any>,
    isLoading:boolean
}


const EditModalTimePickerBlock: FC<Props> = ({ title, time, formik, fieldName, isLoading }) => {
    const [value, setValue] = useState(dayjs(time, 'HH:mm'));

    const onChangeHandler = (newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            const formattedTime = newValue.format('HH:mm');
            console.log('Selected Time:', formattedTime);

            setValue(newValue);
            formik.setFieldValue(fieldName, formattedTime);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DesktopTimePicker',
                ]}
            >
                <label className='required fw-bold fs-6 mb-1'>{title}</label>
                <MobileTimePicker
                    value={value}
                    onChange={onChangeHandler}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export {EditModalTimePickerBlock}
