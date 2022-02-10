import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import Link from "next/link";

const ServiceContactSection = (section) =>  {
    section = section.section
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <section className={`${section.primary.section} ${section.primary.individual_class_name != null ? section.primary.individual_class_name : ''}`}>
            <div className="container services_contact">
                <div className="row">
                    <div className="col-md-2">
                        {section.primary.logo.url != null ?
                        <Image
                            loader={myLoader}
                            src={`${section.primary.logo.url}`}
                            alt={section.primary.logo.alt}
                            width={section.primary.logo.dimensions.width}
                            height={section.primary.logo.dimensions.height}
                        />
                        : false}
                    </div>
                    <div className="col-md-6">
                        {RichText.render(section.primary.content)}
                    </div>
                    <div className="col-md-4">
                        <ul>
                            <li className="white_btn">
                                <a href={`tel:${section.primary.phone_number}`}>{section.primary.phone_number}</a>
                            </li>
                            <li className="orange_btn">
                                <Link href="/contacts">Contacts</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceContactSection