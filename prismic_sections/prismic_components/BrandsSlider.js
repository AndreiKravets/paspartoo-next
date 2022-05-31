import React from 'react'
import Slider from "react-slick";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";

const WeOffer = (section) =>  {
    section = section.section
    console.log(section)
    const brands_slider = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        // autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        nextArrow: <BsChevronCompactRight/>,
        prevArrow: <BsChevronCompactLeft/>,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    centerMode: false,
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 4,
                    centerMode: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                }
            }
        ]
    }
    return (
        <section className= "service_brands_slider">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{section.primary.title}</h4>
                    </div>
                </div>
            </div>
            <div className="brands_slider">
                <Slider {...brands_slider}>
                    {section.items.map((item, index) => {
                        return(
                            <div className="brands_slider_logo_img" key={index}>
                                <img src={item.brand_image.url} alt=""/>
                            </div>
                        )
                    })
                    }
                </Slider>
            </div>
        </section>
    )
}

export default WeOffer