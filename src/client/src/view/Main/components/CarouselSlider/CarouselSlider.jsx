import React from 'react';
import Carousel from 'react-material-ui-carousel'


export default function CarouselSlider({collection}) {

    return (
            <Carousel
                style={{
                    width: '100%',
                    height: 'auto',
                    padding:'20px',
                    margin: 'auto',
                }}
                cycleNavigation={true}
                swipe={true}
                indicators={true}
                indicatorIconButtonProps={{
                    style: {
                        padding: '0',
                        color: 'yellow',
                        border: 'none',
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: 'darkslategray',
                        border: 'none',
                        transform: 'scale(1.2)',
                        transition: 'transform 0.3s',
                    }
                }}
                duration={1500}
                interval={7000}
                navButtonsAlwaysInvisible={true}
                animation='slide'


            >
                {collection}

            </Carousel>

    )
}
