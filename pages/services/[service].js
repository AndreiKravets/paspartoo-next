import React from 'react';
import MainContainer from "../../components/MainContainer";
import Image from 'next/image'
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";
import {loadGetInitialProps} from "next/dist/shared/lib/utils";



const Service = ({data}) => {
   const service = data.results[0].data
    console.log(service)

    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
            <MainContainer>
                <section className="container service_top_section">
                    {RichText.render(service.title)}
                    <Image
                        loader={myLoader}
                        src={`${service.banner.url}`}
                        alt={service.banner.alt}
                        width={service.banner.dimensions.width}
                        height={service.banner.dimensions.height}
                    />
                </section>
                {service.body.map((section, index) => {
                    console.log(section.items)
                    if(section.slice_type == 'section_with_cards') {
                        return (
                            <section key={index} className={`${section.primary.section} ${section.primary.individual_class_name != null ? section.primary.individual_class_name : ''}`}>
                                <div className="container">
                                    <div className="row">
                                        {section.items.map((card, index) => {
                                            if(card.block == "col-12 title_block") {
                                                return (
                                                    <div key={index} className={`${card.block} ${card.individual_class_name != null ? card.individual_class_name : ''}`}>
                                                                {RichText.render(card.title_block)}
                                                                {RichText.render(card.content_block)}
                                                    </div>
                                                )
                                            }
                                            else {
                                                return(
                                                <div key={index} className={`${card.block} ${card.individual_class_name != null ? card.individual_class_name : ''}`}>
                                                    <div className='card_inner'>
                                                            <Image
                                                            loader={myLoader}
                                                            src={`${card.image_block.url}`}
                                                            alt={card.image_block.alt}
                                                            width={card.image_block.dimensions.width}
                                                            height={card.image_block.dimensions.height}
                                                        />
                                                        <div className="card_content">
                                                            {RichText.render(card.title_block)}
                                                            {RichText.render(card.content_block)}
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            }
                                        })}

                                    </div>
                                </div>
                            </section>
                        )
                    }
                })}

            </MainContainer>
        </>
    )
}

export default Service

export async function getServerSideProps({ query }) {
    const productId = query.service;
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const service = await client.query(Prismic.Predicates.at('my.services.uid', productId))
    return {props: {
            data: service
        }}
}
