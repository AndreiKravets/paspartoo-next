import React from 'react';
import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import Image from "next/image";
import Link from "next/link"
import {motion} from "framer-motion";


export default function Home({homepage}) {
    homepage = homepage.results[0].data
    const meta = homepage.body_meta[0].primary
    console.log(homepage)

    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    const variants = {
        hidden_1: {scale: 1, y: -1000, opacity: 0.5},
        enter_1: {scale: 1, y: 0, opacity: 1, transition: {duration: 0.35, ease: [0.48, 0.15, 0.25, 0.96]}},
        hidden_2: {scale: 1, x: -1000, opacity: 0.5},
        enter_2: {scale: 1, x: 0, opacity: 1, transition: {duration: 0.55, ease: [0.48, 0.15, 0.25, 0.96]}},
        hidden_3: {scale: 1, y: 1000, opacity: 0.5},
        enter_3: {scale: 1, y: 0, opacity: 1, transition: {duration: 0.45, ease: [0.48, 0.15, 0.25, 0.96]}},

    }

    return (
        <MainContainer title={meta.title} isVisible={meta.is_visible} description={meta.description}>
            <section className="container home_top_section">
                <div className="row">
                    <div className="col-md-6">
                        {RichText.render(homepage.title)}
                        <h2 className="h4 home_subtitle">{homepage.subtitle}</h2>
                    </div>
                    <div className="col-md-6 home_top_image">
                        {homepage.top_image_1.hasOwnProperty('url') ?
                            <motion.div
                                variants={variants}
                                initial="hidden_1"
                                animate="enter_1"
                                transition={{type: 'linear'}}
                            ><Image
                                loader={myLoader}
                                src={homepage.top_image_1.url}
                                alt={homepage.top_image_1.alt}
                                width={homepage.top_image_1.dimensions.width}
                                height={homepage.top_image_1.dimensions.height}
                            /></motion.div> : ''}
                        {homepage.top_image_2.hasOwnProperty('url') ?
                            <motion.div
                                variants={variants}
                                initial="hidden_2"
                                animate="enter_2"
                                transition={{type: 'linear'}}
                            ><Image
                                loader={myLoader}
                                src={homepage.top_image_2.url}
                                alt={homepage.top_image_2.alt}
                                width={homepage.top_image_2.dimensions.width}
                                height={homepage.top_image_2.dimensions.height}
                            /></motion.div> : ''}
                        {homepage.top_image_3.hasOwnProperty('url') ?
                            <motion.div
                                variants={variants}
                                initial="hidden_3"
                                animate="enter_3"
                                transition={{type: 'linear'}}
                            ><Image
                                loader={myLoader}
                                src={homepage.top_image_3.url}
                                alt={homepage.top_image_3.alt}
                                width={homepage.top_image_3.dimensions.width}
                                height={homepage.top_image_3.dimensions.height}
                            /></motion.div> : ''}
                    </div>
                </div>
            </section>
            <section className="container home_key_section">
                <div className="row name_section">
                    <div className="col-12">
                        <h2 className="h4">{homepage.key_services_title}</h2>
                    </div>
                </div>
                <div className="row">
                    {(homepage.body_key).map((key_service, index) => {
                        return (
                            <motion.div className={key_service.primary.block} initial="hidden" whileInView="visible" key={index} variants={{
                                hidden: {
                                    scale: .5,
                                    opacity: 0,
                                    y: -100
                                },
                                visible: {
                                    scale: 1,
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: .2,
                                        duration: .3, ease: [0.48, 0.15, 0.25, 0.96]
                                    }
                                }
                            }}>
                                <div className="key_service_inner"
                                     style={{backgroundImage: "url(" + key_service.primary.card_background.url + ")"}}>
                                    <h2 className="h3">{key_service.primary.card_title}</h2>
                                    <ul>
                                        {(key_service.items).map((link_item, index) => {
                                            return (
                                                <li key={index}><Link
                                                    href={link_item.page_link}>{link_item.link_text}</Link></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </motion.div>
                        )
                    })
                    }
                </div>
            </section>
            <section className="home_video_section">
                <video autoPlay muted loop id="myVideo">
                    <source src={`${homepage.video.url}`} type="video/mp4"/>
                </video>
            </section>
            <section className="container home_why_us">
                <div className="row name_section">
                    <div className="col-12">
                        <h2 className="h4">{homepage.why_us_title}</h2>
                    </div>
                    {(homepage.why_us_content).map((why_us_item, index) => {
                        return (
                            <div className="col-md-3" key={index}>
                                <span>0{index + 1}</span>
                                {why_us_item.why_us_item}
                            </div>
                        )
                    })
                    }

                </div>
            </section>
        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const homepage = await client.query(Prismic.Predicates.at('document.type', 'homepage'))

    return {
        props: {
            homepage: homepage
        }
    };
}