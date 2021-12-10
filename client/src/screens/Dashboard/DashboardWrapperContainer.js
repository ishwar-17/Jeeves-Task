import React, { useState, useEffect } from 'react';
import { getAllProperty } from '../../DataLayer/dataLayerUtilities';
import { useHistory } from 'react-router-dom';

import './dashboardWrapperContainerStyles.scss';
import ListItemCard from '../../components/Common/ListItemCard/ListItemCard';

const DasboardWapperContainer = (props) => {
    const [propertys, SetProperty] = useState(null);
	const history = useHistory();

	const getProperty = async () => {
		let response = await getAllProperty();
		console.log(response);
		SetProperty(response);
	}

	const createPropertyHandler = () => {
		history.push('/create');
	}

	useEffect(() => {
		if(!propertys) {
			getProperty();
		}
	});
	
    return(
        <div className="screen-container">
			<div className="text-right mt-3 mb-3">
				<button className="btn btn-create btn-lg" onClick={() => createPropertyHandler()}>Create property</button>
			</div>
			<div className="list-card">
				{(propertys && propertys.length > 0) ? (
					propertys.map(property => 
						<div className="col-md-12 col-lg-12 col-sm-12 list-item" key={property.id}>
							<ListItemCard listItem={property} />
						</div>)
				) : (
					<div className="col-md-12 col-lg-12 col-sm-12 p-5 list-item text-center">
						<p className="m=0">No propertys found</p>
					</div>
				)}
			</div>
        </div>
    )
}
export default DasboardWapperContainer;