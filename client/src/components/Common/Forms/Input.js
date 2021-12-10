import React from 'react';
import styled from 'styled-components';


export const InputContainer = styled.input`
    height: 60px;
    padding: 15px 20px;
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
`;

export const Label = styled.label`
    font-weight: 600;
    color: #444;
`;

const InputComponent = ({label, customClass, value, type, name, placeholder, inputKey, isError, errorMessage, errorKey, onChangeHandler}, ref) => {
    return (
        <div className={`form-group ${customClass && customClass }`}>
            {   label &&
                    <Label>{label}</Label>
            }
            <InputContainer
                className={`form-control ${isError && 'border-red-color'}`}
                value={value}
                type={type}
                name={name}
                placeholder={placeholder}
                ref={ref}
                onChange={() => onChangeHandler(inputKey, ref.current.value, errorKey)}
            />
            {   isError && 
                    <p className="text-red-color">{errorMessage}</p>
            }
        </div>
    )
}

const Input = React.forwardRef(InputComponent);
export default Input;