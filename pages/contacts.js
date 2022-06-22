import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import React from "react";
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import ContactForm from '../components/ContactForm'

export default function Contacts({ data, services, services_category, header_footer }) {
    header_footer = header_footer
    services = services.results
    services_category = services_category.results
    data = data.results[0].data
    const meta = data.body[0].primary
    return (
        <MainContainer header_footer={header_footer} services_category={services_category} services={services}
                       title={meta.title} isVisible={meta.is_visible}
                       description={meta.description} keywords={meta.keywords} og_locale={meta.og_locale}
                       og_type={meta.og_type} og_title={meta.og_title} og_description={meta.og_description}
                       og_url={meta.og_url} og_site_name={meta.og_site_name} twitter_card={meta.twitter_card}
                       twitter_description={meta.twitter_description} twitter_title={meta.twitter_title}
                       twitter_image={meta.twitter_image} msapplication_tileimage={meta.msapplication_tileimage}>
            <section className="contacts_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 contacts_section_content">
                          <h1 className="h2">
                              {data.title}
                          </h1>
                            <h4>Use the form or write us an e-mail: </h4>
                            <a href="mailto:info@paspartoo.com">info@paspartoo.com</a>
                            <a href="tel:+17029704043" className="contacts_tel">+1 702 970 4043</a>
                        </div>
                        <div className="col-lg-7 contacts_section_form">
                            <ContactForm />
                        </div>
                    </div>
                    <div className="row contacts_section_address">
                        <div className="col-12"><div></div></div>
                        <div className="col-sm-4">
                             <h3>United States</h3>
                            <p>18851 NE 29th Ave, Suite 700 <br/> Miami, FL 33180</p>
                        </div>
                        <div className="col-sm-4">
                             <h3>Portugal</h3>
                            <p>Rua dos Anjos 1F <br/>
                                Lisboa, 1150-032</p>
                        </div>
                        <div className="col-sm-4">
                             <h3>Ukraine</h3>
                            <p>Sobornyi Ave, 160 <br/>
                                Zaporizhzhia, Ukraine</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <img src="/map.jpg" alt="map"/>
                </div>
            </section>

        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const data = await client.query(Prismic.Predicates.at('document.type', 'contacts'))
    const services = await client.query(Prismic.Predicates.at('document.type', 'services'))
    const services_category = await client.query(Prismic.Predicates.at('document.type', 'services_category'))
    return {props: {
            services_category:services_category,
            services:services,
        header_footer:header_footer,
        data: data
    }}
}