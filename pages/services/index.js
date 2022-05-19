import React, {useState, useEffect} from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Link from "next/link";


const Services = ({services, header_footer}) => {
    header_footer = header_footer
    services = services.results
    console.log(services)

    return (
        <>
            <MainContainer header_footer={header_footer}>
                <section className="container blog_top_section">
                    <div>
                        <h1>Services</h1>
                    </div>
                </section>
                <section className="service_section">
                    <div className="container">
                        <div className="row">
                            {
                                (services.map((item) => {
                                    return(
                                        <article className="col-12" key={item.id} >
                                                <img src={item.data.banner.url} alt={item.data.banner.alt}/>
                                                <Link href={`/services/${item.uid}`} ><a className="h4">{item.data.service_title}</a></Link>
                                        </article>
                                    )
                                }))
                            }
                        </div>
                    </div>
                </section>
            </MainContainer>
        </>
    )
}

export default Services

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const services = await client.query(Prismic.Predicates.at('document.type', 'services'))
    return {props: {
            header_footer:header_footer,
            services: services
        }}
}
