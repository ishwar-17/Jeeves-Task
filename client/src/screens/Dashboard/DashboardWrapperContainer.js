import React, { useState, useRef, useEffect } from 'react';
import { getAllProperty } from '../../DataLayer/dataLayerUtilities';
import { useHistory } from 'react-router-dom';
import Select from '../../components/Common/Forms/Select';
import { filterLocalityObject } from './constants';
import ListItemCard from '../../components/Common/ListItemCard/ListItemCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import './dashboardWrapperContainerStyles.scss';
import DatePickerComponent from '../../components/Common/Forms/DatePickerComponent';
import Loader from '../../components/Common/Loader/Loader';

const DasboardWapperContainer = (props) => {
    const [propertys, setProperty] = useState(null);
	const [loader, setLoader] = useState(true);
	const [filterLocality, setFilterLocality] = useState('');
	const [selectedDate, setSelectedDate] = useState('');
	const [pageCount, setPageCount] = useState(1);
	const history = useHistory();

	const getProperty = async () => {
		let response = await getAllProperty();
		setProperty(response.property);
		setLoader(false);
	}
	const filter_locality_ref = useRef(null);
	const selected_date_ref = useRef(null);

	const handlerFilterLocality = async(key, value) => {
		setFilterLocality(value);
		const params = {
			locality: value
		};
		const response = await getAllProperty(params);
		setProperty(response.property);
	}

	const handlerFilterDate = async(value) => {
		console.log(value);
		console.log(moment(value));
		const formatDate = moment(value).format('DD/MM/YYYY');
		setSelectedDate(value);
		const params = {
			createdAt: value
		};
		const response = await getAllProperty(params);
		setProperty(response.property);
	}

	const createPropertyHandler = () => {
		history.push('/create');
	}

	const onScrollLoadMoreProperty = async() => {
		const params = {
			page: pageCount,
			limit: 10
		}
		const response = await getAllProperty(params);
		setProperty(response.property);
		setPageCount(prevCount => prevCount + 1);
	}

	useEffect(() => {
		if(!propertys) {
			getProperty();
		}
	});
	
    return(
        <div className="screen-container">
			<div className="row">
				<div className="col-md-4 col-lg-4 mt-3 mb-3">
					<label className="d-inline filter-label">Filter by</label>
					<Select
						value={filterLocality}
						ref={filter_locality_ref}
						customClass="m-0 customSelectBox"
						selectClass="customSelect"
						options={filterLocalityObject}
						inputKey="filterLocality"
						onChangeHandler={handlerFilterLocality}
					/>
				</div>
				<div className="col-md-4 col-lg-4 mt-3 mb-3">
					<DatePickerComponent
						selectedDate={selectedDate}
						name="selectDate"
						dateFormat="dd/MM/yyyy"
						onChangeHandler={handlerFilterDate}
						ref={selected_date_ref}
					/>
				</div>
				<div className="col-md-4 col-lg-4 text-right mt-3 mb-3">
					<button className="btn btn-create btn-create-dashboard" onClick={() => createPropertyHandler()}>Create property</button>
				</div>
			</div>
			<div className="list-card">
				{	loader ?
						<div className="d-flex justify-center">
							<Loader />
						</div>
					:
						<React.Fragment>
							{(propertys && propertys.length > 0) ? (
								propertys.map(property => 
									<div className="col-md-12 col-lg-12 col-sm-12 list-item" key={property._id}>
										<ListItemCard listItem={property} />
									</div>)
							) : (
								<div className="col-md-12 col-lg-12 col-sm-12 p-5 list-item text-center">
									<p className="m=0 no-data">No propertys found</p>
								</div>
							)}
						</React.Fragment>
				}
			</div>
        </div>
    )
}
export default DasboardWapperContainer;