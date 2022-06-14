import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";

const KeyPoints = (section) =>  {
    section = section.section
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <section className={`key_points_section ${section.primary.individual_class_name != null ? section.primary.individual_class_name : ''}`}>
            <div className="container">
                <div className="row">
                    {section.items.map((card, index) => {
                        return(
                            <div key={index} className="col-sm-4">
                                <div className='card_inner'>
                                    <div className="card_title_content">
                                        <h4>{card.title}</h4>
                                    </div>
                                    <div className="card_content">
                                    <h3>{card.price}</h3>
                                        {RichText.render(card.key_points)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default KeyPoints