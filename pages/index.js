import React from 'react';
import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import Image from "next/image";
import Link from "next/link"
import { useViewportScroll,useTransform,motion} from "framer-motion";


export default function Home({homepage}) {
    homepage = homepage.results[0].data
    const meta = homepage.body_meta[0].primary
    console.log(homepage)

    const { scrollY } = useViewportScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 200]);
    const y2 = useTransform(scrollY, [0, 300], [0, -100]);

    console.log(scrollY)

    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    const variants = {
        hidden_1: {scale: 1, y: -1000, opacity: 0.5},
        enter_1: {scale: 1, y: 0, opacity: 1, transition: {type: "spring", bounce: 0.4, duration: 0.7}},
        hidden_2: {scale: 1, x: -1000, opacity: 0.5},
        enter_2: {scale: 1, x: 0, opacity: 1, transition: {type: "spring", bounce: 0.4, duration: 0.8}},
        hidden_3: {scale: 1, rotate:-30, y: 1000, opacity: 0.5},
        enter_3: {scale: 1, rotate: 0, y: 0, opacity: 1, transition: {type: "spring", bounce: 0.4, duration: 0.14}},

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
                            <motion.div className={key_service.primary.block}
                                        initial="hidden" whileInView="visible"
                                        viewport={{ once: true }} key={index} variants={{
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
                                        type: "spring",
                                        bounce: 0.4,
                                        duration: 0.8
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
            <section className="container-fluid home_why_us">
                <div className="container">
                  <div className="row name_section">
                    <div className="col-12">
                        <h2 className="h4">{homepage.why_us_title}</h2>
                    </div>
                    {(homepage.why_us_content).map((why_us_item, index) => {
                        return (
                            <motion.div className="col-md-3" key={index}
                                        initial="hidden" whileInView="visible"
                                        viewport={{ once: true }} key={index} variants={{
                                hidden: {
                                    scale: .5,
                                    opacity: 0,
                                    y: -100,
                                    rotate: 80
                                },
                                visible: {
                                    scale: 1,
                                    y: 0,
                                    opacity: 1,
                                    rotate: 0,
                                    transition: {
                                        delay: .2 * index,
                                        type: "spring",
                                        bounce: 0.4,
                                        duration: .8
                                    }
                                }
                            }}>
                                <div className="home_why_us_inner">
                                <span>0{index + 1}</span>
                               <h3>{why_us_item.why_us_item}</h3>
                                </div>
                            </motion.div>
                        )
                    })
                    }
                  </div>
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