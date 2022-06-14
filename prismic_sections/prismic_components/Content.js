import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";

const Content = (section) => {
    section = section.section
    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <div
            className="service_content_section">
            <div>
                {section.items.map((card, index) => {
                        return (
                            <div key={index} className="row">
                                <div
                                    className={`col-12 ${card.individual_class_name != null ? card.individual_class_name : ''}`}>
                                    {RichText.render(card.content)}
                                </div>
                            </div>
                        )
                })}
            </div>
        </div>
    )
}

export default Content