import React from 'react';
import MainContainer from "../../components/MainContainer";
import Image from 'next/image'
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";
import PrismicBody from "../../prismic_sections/PrismicBody";


const Service = ({data}) => {
    const service = data.results[0].data
    console.log(service)

    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
            <MainContainer>
                <section className="container service_top_section">
                    {RichText.render(service.title)}
                    {RichText.render(service.description)}
                    <Image
                        loader={myLoader}
                        src={`${service.banner.url}`}
                        alt={service.banner.alt}
                        width={service.banner.dimensions.width}
                        height={service.banner.dimensions.height}
                    />
                </section>

                <PrismicBody body={service.body}/>

            </MainContainer>
        </>
    )
}

export default Service

export async function getServerSideProps({query}) {
    const productId = query.service;
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const service = await client.query(Prismic.Predicates.at('my.services.uid', productId))
    return {
        props: {
            data: service
        }
    }
}
