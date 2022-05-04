import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";

const ContentAndImage = (section) => {
    section = section.section
    console.log("SECTION", section)
    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <section
            className="service_image_section">
            <div className="container">
                {section.items.map((card, index) => {
                    if (card.block == "title_block") {
                        return (
                            <div key={index} className="row">
                                <div
                                    className={`col-12 ${card.block} ${card.individual_class_name != null ? card.individual_class_name : ''}`}>
                                    {RichText.render(card.content)}
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={index} className={`row section_image_row ${card.block} ${card.individual_class_name != null ? card.individual_class_name : ''}`}>
                                <div className="col-lg-6 image_block">
                                    <div className='section_image_inner'>
                                        {card.image.url != null ?
                                            <Image
                                                loader={myLoader}
                                                src={`${card.image.url}`}
                                                alt={card.image.alt}
                                                width={card.image.dimensions.width}
                                                height={card.image.dimensions.height}
                                            />
                                            : false}
                                    </div>
                                </div>
                                <div className="col-lg-6 content_block">
                                    <div className='section_image_inner'>
                                            {RichText.render(card.content)}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </section>
    )
}

export default ContentAndImage