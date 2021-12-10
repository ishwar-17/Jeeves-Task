import React from "react";
import styled from 'styled-components';
import { RangeSlider } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export const Label = styled.label`
    font-weight: 600;
    color: #444;
`;

const RangeSliderComponent = ({label, customClass, value, min, max, inputKey, onChangeHandler}) => {
    console.log(value);
	return (
		<div className={`form-group ${customClass && customClass}`}>
			{ 	label && <Label>{label}</Label> }
			<div className="ranger-slider-block">
				<RangeSlider 
					defaultValue={[15 , 25]} 
					min={min} 
					max={max}
					onChange={value => {
						onChangeHandler(inputKey, [value[0], value[1]]);
					}}
				/>
				<div className="mt-3">
					<small className="price-range">{`${value[0]}L to ${value[1]}L`}</small>
				</div>
			</div>
		</div>
	)
}
export default RangeSliderComponent;