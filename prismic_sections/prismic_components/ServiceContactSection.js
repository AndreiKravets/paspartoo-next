import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import Link from "next/link";
import RecentProjects from "../../components/RecentProjects";

const ServiceContactSection = (section) =>  {
    const project_slider = section.project_slider
    const project_category = section.project_category
    return (
        <>
        <RecentProjects project_slider={project_slider} project_category={project_category} />
        <section>
            <div className="container services_contact">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Contact Us Right Now!</h3>
                        <h6>Your website is your primary sales tool. Your success depends on its functionality, performance and design.</h6>
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li className="pink_btn">
                                <a href="tel:+17029704043">+1 (702) 970-4043</a>
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