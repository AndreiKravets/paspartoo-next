import React from 'react';
import MainContainer from "../../components/MainContainer";
import Image from 'next/image'
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";
import PrismicBody from "../../prismic_sections/PrismicBody";


const Service = ({data, header_footer, projects, category}) => {

    header_footer = header_footer
    const categorys = category.results
    const project = projects.results
    const service = data.results[0].data
    const meta = service.body1[0].primary
    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
            <MainContainer header_footer={header_footer} title={meta.title} isVisible={meta.is_visible}
                           description={meta.description} keywords={meta.keywords} og_locale={meta.og_locale}
                           og_type={meta.og_type} og_title={meta.og_title} og_description={meta.og_description}
                           og_url={meta.og_url} og_site_name={meta.og_site_name} twitter_card={meta.twitter_card}
                           twitter_description={meta.twitter_description} twitter_title={meta.twitter_title}
                           twitter_image={meta.twitter_image} msapplication_tileimage={meta.msapplication_tileimage}>
                <section className="container service_top_section">
                   <h1 className="h2">{service.service_title}</h1>
                    {RichText.render(service.description)}
                    <Image
                        loader={myLoader}
                        src={`${service.banner.url}`}
                        alt={service.banner.alt}
                        width={service.banner.dimensions.width}
                        height={service.banner.dimensions.height}
                    />
                </section>

                <PrismicBody project_slider = {project} project_category = {categorys} content={service.body} />

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
    const service = await client.query(Prismic.Predicates.at('my.services.uid', productId))
    const category = await client.query(Prismic.Predicates.at('document.type', 'projects_category'))
    return {
        props: {
            projects:projects,
            header_footer:header_footer,
            data: service,
            category: category
        }
    }
}
