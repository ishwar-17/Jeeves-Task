import React, { useState, useRef, useEffect } from 'react';
import Input from '../../components/Common/Forms/Input';
import Textarea from '../../components/Common/Forms/Textarea';
import Select from '../../components/Common/Forms/Select';
import RangeSliderComponent from '../../components/Common/Forms/RangeSliderComponent';
import ImageUploadPreview from '../../components/ImageUploadPreview/ImageUploadPreviewComponent';
import { createProperty } from '../../DataLayer/dataLayerUtilities';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import './createWrapperContainerStyles.scss';

const CreateWapperContainer = (props) => {
	const initialPropertyState = {
        propertyName:"",
        description: "",
        address: "",
        locality: "",
        price: [10, 40],
        carpetArea: "",
		images: [],
    };

	const initialErrorMessageState = {
		errorPropertyName: false,
		errorDescription: false,
		errorAddress: false,
		errorLocality: false,
		errorPrice: false,
		errorCarpetArea: false
	};

    const [{propertyName, description, address, locality, price, carpetArea, images}, SetProperty] = useState(initialPropertyState);
	const [{errorPropertyName, errorDescription, errorAddress, errorLocality, errorPrice, errorCarpetArea}, SetErrorMessage] = useState(initialErrorMessageState);
	const [convertCarpetArea, setCarpetArea]= useState('');
	const [unit, setUnit] = useState("");
	const history = useHistory();
	const { addToast } = useToasts();

    const property_name_ref = useRef(null);
    const description_ref = useRef(null);
    const address_ref = useRef(null);
    const locality_ref = useRef(null);
    const carpet_area_ref =  useRef(null);
	const images_ref = useRef(null);
	const unit_ref = useRef(null);

	const onChangeHandler = (key, value, errorKey) => {
		if(!value){
			SetErrorMessage(prevState => ({ ...prevState, [errorKey] : true}));
		}else{
			SetErrorMessage(prevState => ({ ...prevState, [errorKey] : false}));
		}
		SetProperty(prevState => ({ ...prevState, [key]: value}));
	}

	const createPropertyHandler = async() => {
		const isValid = validationChecker();
		if(!isValid){
			return;
		}
		const formData = {propertyName, description, images, address,locality, price, carpetArea: `${Math.round(convertCarpetArea)} ${unit}`};
		const { error } = await createProperty(formData);
		if(error){
			addToast(error.message, { appearance: 'error', autoDismiss: true });
			return;
		}
		addToast("New property created successfully", { appearance: 'success', autoDismiss: true });
		history.push('/');
		SetProperty(initialPropertyState);	
	}

	const validationChecker = () => {
		let valid = true;
		if(!propertyName && !description && !address && !locality && !carpetArea){
			valid = false;
			for(const [key] of Object.entries(initialErrorMessageState)){
				SetErrorMessage(prevState => ({ ...prevState, [key] : true}));
			}
			return valid;
		}
		return valid;
	}

	const calculateCarpetArea = (value, unit="ft") => {
		let getSquareFeet = null;
		switch(unit){
			case "ft":
				getSquareFeet = value * value;
				break;
			case "yd":
				getSquareFeet = (value * value)/9;
				break;
			default :
				getSquareFeet = null;
		}
		setCarpetArea(getSquareFeet);
		setUnit(`sq ${unit}`);
	}

	useEffect(() => {
		property_name_ref.current.focus();
	}, []);

    return(
        <div className="screen-container">
			<div className="row">
				<div className="col-md-6 create-property-container">
					<h5>Create Property</h5>
					<Input
						label="Property name"
						customClass="mb-4"
						value={propertyName}
						type="text"
						name="propertyName"
						placeholder="Enter property name..."
						inputKey="propertyName"
						ref={property_name_ref}
						onChangeHandler={onChangeHandler}
						isError={errorPropertyName}
						errorKey="errorPropertyName"
						errorMessage="Please enter a property name"
					/>
					<Textarea
						label="Description"
						customClass="mb-4"
						value={description}
						name="description"
						placeholder="Enter description of property..."
						inputKey="description"
						ref={description_ref}
						onChangeHandler={onChangeHandler}
						isError={errorDescription}
						errorKey="errorDescription"
						errorMessage="Please enter a description"
					/>
					<Input
						label="Address"
						customClass="mb-4"
						value={address}
						type="text"
						name="address"
						placeholder="Enter your address..."
						inputKey="address"
						ref={address_ref}
						onChangeHandler={onChangeHandler}
						isError={errorAddress}
						errorKey="errorAddress"
						errorMessage="Please enter a address"
					/>
					<Input
						label="Locality/Area"
						customClass="mb-4"
						value={locality}
						type="text"
						name="locality"
						placeholder="Enter locality/area..."
						inputKey="locality"
						ref={locality_ref}
						onChangeHandler={onChangeHandler}
						isError={errorLocality}
						errorKey="errorLocality"
						errorMessage="Please enter a locality/area"
					/>
					<RangeSliderComponent
						label="Price"
						customClass="mb-4"
						value={price}
						min={10}
						max={60}
						inputKey="price"
						onChangeHandler={onChangeHandler}
					/>
					<div className="row">
						<div className="col">
							<Input 
								label="Carept Area"
								customClass="m-0"
								value={carpetArea}
								type="text"
								name="carpetarea"
								placeholder="Enter carpet area..."
								inputKey="carpetArea"
								ref={carpet_area_ref}
								isError={errorCarpetArea}
								errorKey="errorCarpetArea"
								errorMessage="Please enter a carpet area and select unit"
								onChangeHandler={onChangeHandler}
							/>
						</div>
						<div className="col-auto">
							<Select
								label="Unit"
								customClass="mb-2"
								value={unit}
								ref={unit_ref}
								options={[{text: 'Select unit', value: ''},{text: 'Square feet', value: 'ft'}, {text: 'Square yard',  value: 'yd'}]}
								inputKey={carpetArea}
								isError={errorCarpetArea}
								onChangeHandler={calculateCarpetArea}
							/>
						</div>
					</div>
					<p className="mb-3">{convertCarpetArea && `Calculated carpet area is : ${Math.round(convertCarpetArea)} ${unit}`}</p>
					<ImageUploadPreview 
						label="Property images"
						customClass=""
						inputKey="images"
						ref={images_ref}
						onChangeHandler={onChangeHandler}
					/>
					<button className="btn btn-create btn-block" onClick={() => createPropertyHandler()}>Create</button>
				</div>
			</div>
        </div>
    )
}
export default CreateWapperContainer;