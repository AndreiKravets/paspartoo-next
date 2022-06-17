import React from 'react';
import MainContainer from "../../../components/MainContainer";
import Image from 'next/image'
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";
import PrismicBody from "../../../prismic_sections/PrismicBody";
import Link from "next/link";
import {loadGetInitialProps} from "next/dist/shared/lib/utils";
import ServiceContactSection from "../../../prismic_sections/prismic_components/ServiceContactSection";


const Service = ({services, service, services_category, header_footer, projects, category}) => {

    header_footer = header_footer
    services = services.results
    services_category = services_category.results
    const categorys = category.results
    const project = projects.results
    service = service.results[0].data
    const meta = service.body1[0].primary
    const sort_services = []
    console.log(services_category)
    console.log(services)
    services.map((item, index) => {
        sort_services[item.data.order - 1] = item
    })

    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
            <MainContainer header_footer={header_footer} services_category={services_category} services={services}
                           title={meta.title} isVisible={meta.is_visible}
                           description={meta.description} keywords={meta.keywords} og_locale={meta.og_locale}
                           og_type={meta.og_type} og_title={meta.og_title} og_description={meta.og_description}
                           og_url={meta.og_url} og_site_name={meta.og_site_name} twitter_card={meta.twitter_card}
                           twitter_description={meta.twitter_description} twitter_title={meta.twitter_title}
                           twitter_image={meta.twitter_image} msapplication_tileimage={meta.msapplication_tileimage}
            >
                    {
                        (services_category.map((category) => {
                            return (
                                <>
                                    {category.slugs == service.categories[0].category.slug ?
                                        <section className="service_top_section" style={{backgroundColor: category.data.background_top_section}} key={category.id}>
                                            <div className="container">
                                                <h6>Home | Services | Magento</h6>
                                                <h1 className='h2'>{category.data.title}</h1>
                                            </div>
                                        </section>
                                        : ""
                                    }
                                </>
                            )
                        }))
                    }
                    <section className="service_section">
                        <div className="container">
                             <div className="row">
                                 <div className="col-sm-3">
                                     <ul>
                                         {
                                             (sort_services.map((item, index) => {
                                                 return (
                                                     <>
                                                         {
                                                             service.categories[0].category.slug == item.data.categories[0].category.slug ?
                                                             <li key={index} className='h5'>
                                                                 <Link rel="stylesheet" href={`/services/${item.data.categories[0].category.slug}/${item.uid}`}>{item.uid}</Link>
                                                             </li>
                                                             : ""
                                                         }
                                                     </>
                                                 )
                                             }))
                                         }
                                     </ul>
                                 </div>
                                 {/*<div className="col-sm-9">*/}
                                    <PrismicBody project_slider = {project} project_category = {categorys} content={service.body} />
                                 {/*</div>*/}
                             </div>
                        </div>
                    </section>
                <ServiceContactSection project_slider = {project} project_category = {categorys} content={service.body} />
                {/*<PrismicBody project_slider = {project} project_category = {categorys} content={service.body} />*/}
            </MainContainer>
        </>
    )
}

export default Service

export async function getServerSideProps({query}) {
    const productId = query.service;
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const projects = await client.query(Prismic.Predicates.at('document.type', 'project'))
    const services = await client.query(Prismic.Predicates.at('document.type', 'services'))
    const services_category = await client.query(Prismic.Predicates.at('document.type', 'services_category'))
    const service = await client.query(Prismic.Predicates.at('my.services.uid', productId))
    const category = await client.query(Prismic.Predicates.at('document.type', 'projects_category'))
    return {
        props: {
            services_category:services_category,
            services:services,
            service:service,
            projects:projects,
            header_footer:header_footer,
            category: category
        }
    }
}
