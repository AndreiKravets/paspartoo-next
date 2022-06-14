import React from 'react'
import Slider from "react-slick";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";

const ImagesSection = (section) =>  {
    section = section.section
    console.log(section)
    return (
        <section className= "service_images_section">
                <div className="row">
                    <div className="col-12">
                        <h4>{section.primary.title}</h4>
                    </div>
                </div>
            <div className="service_images_block">
                    {section.items.map((item, index) => {
                        return(
                            <div className="service_images_block_img" key={index}>
                                <div>
                                <img src={item.image.url} alt=""/>
                                </div>
                            </div>
                        )
                    })
                    }
            </div>
        </section>
    )
}

export default ImagesSection