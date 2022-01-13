import React, { Fragment } from 'react';
import styled from 'styled-components';

export const SelectContainer = styled.select`
    height: 60px;
    padding: 15px;
    border:1px solid #fff;
    box-shadow: 0 0 1px 2px #fff, 0 0 16px 5px #f1f1f1;
    border-radius: 6px;
    transition: all 0.5s ease-in-out;

    &:hover, &:focus, &:active:focus{
        border: 1px solid #9933ff;
        outline:none;
        box-shadow:none;
    }
    &.border-red-color, &.border-red-color:hover, &.border-red-color:focus{
        border-color: #ff0000;
    }

    option{
        padding:10px;
        color: #9933ff;;
    }
`;

export const Label = styled.label`
    font-weight: 600;
    color: #444;
`;

const SelectComponent = ({label, value, customClass, selectClass, isError, options, inputKey, onChangeHandler}, ref) => {
    return (
        <div className={`form-group ${customClass && customClass}`}>
            {   label &&
                    <Label>{label}</Label>
            }
            <SelectContainer
                defaultValue={value}
                ref={ref}
                className={`form-control ${selectClass && selectClass} ${isError && isError && 'border-red-color'}`}
                onChange={() => onChangeHandler(inputKey, ref.current.value)}
            >
                {   options.length > 0 &&
                        <Fragment>
                            {   options.map((items, index) => (
                                    <option key={index} value={items.value}>{items.text}</option>
                            ))}
                        </Fragment>
                }

            </SelectContainer>
        </div>
    )
}

const Select = React.forwardRef(SelectComponent);
export default Select;