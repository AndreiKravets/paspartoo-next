import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";

const SectionWithCards = (section) =>  {
    section = section.section
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <section className={`${section.primary.section} ${section.primary.individual_class_name != null ? section.primary.individual_class_name : ''}`}>
                    <div className="container">
                         <div className="row">
                             {section.items.map((card, index) => {
                                if(card.block == "col-12 title_block") {
                                    return (
                                        <div key={index} className={`${card.block} ${card.individual_class_name != null ? card.individual_class_name : ''}`}>
                                                    {RichText.render(card.title_block)}
                                                    {RichText.render(card.content_block)}
                                        </div>
                                    )
                                }
                                else {
                                    return(
                                    <div key={index} className={`${card.block} ${card.individual_class_name != null ? card.individual_class_name : ''}`}>
                                        <div className='card_inner'>
                                            {card.image_block.url != null ?
                                                <Image
                                                loader={myLoader}
                                                src={`${card.image_block.url}`}
                                                alt={card.image_block.alt}
                                                width={card.image_block.dimensions.width}
                                                height={card.image_block.dimensions.height}
                                            />
                                            : false}
                                            <div className="card_content">
                                                {RichText.render(card.title_block)}
                                                {RichText.render(card.content_block)}
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }
                            })}

                        </div>
                    </div>
                </section>
    )
}

export default SectionWithCards