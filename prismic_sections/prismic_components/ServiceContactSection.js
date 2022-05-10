import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import Link from "next/link";
import RecentProjects from "../../components/RecentProjects";

const ServiceContactSection = (section) =>  {

    const project_slider = section.project_slider
    section = section.section
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
        <RecentProjects project_slider={project_slider} />
        <section className={`${section.primary.section} ${section.primary.individual_class_name != null ? section.primary.individual_class_name : ''}`}>
            <div className="container services_contact">
                <div className="row">
                    <div className="col-md-6">
                        {RichText.render(section.primary.content)}
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li className="pink_btn">
                                <a href={`tel:${section.primary.phone_number}`}>{section.primary.phone_number}</a>
                            </li>
                            <li className="white_btn">
                                <Link href="/contacts">Contacts</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ServiceContactSection