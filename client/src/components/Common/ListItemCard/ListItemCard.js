import React, { Fragment } from 'react';
import CarouselContainer from '../../Carousel/CarouselContainer';
import './listItemStyles.scss';

const ListItemCard = (props) => {
    const { propertyName, description, price, carpetArea, address, locality, images, createdAt } = props.listItem;
    return (
        <div className="row">
            <div className="col-md-9 col-lg-9 col-sm-9">
                <h4 className="product_name">{propertyName}</h4>
                <p className="product_description">{description}</p>
                <p className="product_price">Price : <span>{price && `${price[0]}L to ${price[1]}L`}</span></p>
                <p className="product_carpetarea">Carpert area : <span>{carpetArea}</span></p>
                <p className="product_address">Address : <span>{address}</span><span>{locality}</span></p>
                <p className="product_createdate">Created : <span>{createdAt}</span></p>
            </div>
            <div className="col-md-3 col-lg-3 col-sm-3 list-item-images">
                <CarouselContainer images={images} altName={propertyName}/>
            </div>
        </div>
    )
}
export default ListItemCard;