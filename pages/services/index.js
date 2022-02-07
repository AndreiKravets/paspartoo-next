import React, {useState, useEffect} from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Link from "next/link";


const Services = ({services}) => {
    services = services.results
    console.log(services)

    return (
        <>
            <MainContainer>
                <section className="container blog_top_section">
                    <div>
                        <h1>Services</h1>
                    </div>
                </section>
                <section className="blog_section">
                    <div className="container">
                        <div className="row">
                            {
                                (services.map((item) => {
                                    return(
                                        <article className="col-md-4" key={item.id} >
                                            <div className="blog_item_inner">
                                                <img src={item.data.banner.url} alt={item.data.banner.alt}/>
                                                <a href={`/services/${item.uid}`} className="h3">{item.data.title[0].text}</a>
                                            </div>
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
    const services = await client.query(Prismic.Predicates.at('document.type', 'services'))
    return {props: {
            services: services
        }}
}
