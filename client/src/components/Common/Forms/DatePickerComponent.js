import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerRef = ({selectedDate, name, dateFormat, onChangeHandler}, ref) => {

    const handlerDatePicker = (date) => {
        onChangeHandler(date);
    }
    return (
        <DatePicker
            selected={selectedDate}
            onChange={handlerDatePicker}
            name={name}
            dateFormat={dateFormat}
            ref={ref}
        />
    )
}
const DatePickerComponent = React.forwardRef(DatePickerRef);
export default DatePickerComponent