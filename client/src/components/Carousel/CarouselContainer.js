import React, { Fragment } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselContainer = ({images, propertyName}) => {
    return (
        <Carousel>
            {
                images.map((item, index) => (
                    <Fragment key={index}>
                        <img src={item} alt={propertyName} />
                    </Fragment>
                ))
            }
        </Carousel>
    );
};

export default CarouselContainer;