import React from 'react';
import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import Image from "next/image";
import Link from "next/link"
import {motion} from "framer-motion";
import {BsChevronCompactRight, BsChevronCompactLeft} from "react-icons/bs";
import Slider from "react-slick";


export default function Home({homepage, projects, category}) {
    homepage = homepage.results[0].data
    projects = projects.results
    category = category.results
    console.log(homepage)
    console.log(projects)
    console.log(category)
    const meta = homepage.body_meta[0].primary
    const top_slider = projects.slice(0, projects.length / 2)
    const bottom_slider = projects.slice(projects.length / 2, projects.length + 1)
    console.log(top_slider)
    const settings_top = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <BsChevronCompactRight/>,
        prevArrow: <BsChevronCompactLeft/>
    }
    const settings_bottom = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <BsChevronCompactRight/>,
        prevArrow: <BsChevronCompactLeft/>
    }

    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    const variants = {
        hidden_1: {scale: 1, y: -1000, opacity: 0.5},
        enter_1: {scale: 1, y: 0, opacity: 1, transition: {type: "spring", bounce: 0.4, duration: 0.7}},
        hidden_2: {scale: 1, x: -1000, opacity: 0.5},
        enter_2: {scale: 1, x: 0, opacity: 1, transition: {type: "spring", bounce: 0.4, duration: 0.8}},
        hidden_3: {scale: 1, rotate: -30, y: 1000, opacity: 0.5},
        enter_3: {scale: 1, rotate: 0, y: 0, opacity: 1, transition: {type: "spring", bounce: 0.4, duration: 0.14}},

    }

    return (
        <MainContainer title={meta.title} isVisible={meta.is_visible} description={meta.description}>

            <section className="home_top_main_section">
                <div className="container home_top_section">
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
                </div>
            <div className="container home_key_section">
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
                                        viewport={{once: true}} key={index} variants={{
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
            </div>
            </section>
            <section className="home_video_section">
                <video autoPlay muted loop id="myVideo">
                    <source src={`${homepage.video.url}`} type="video/mp4"/>
                </video>
            </section>
            <section className="container-fluid home_why_us_section">
                <div className="container">
                    <div className="row name_section">
                        <div className="col-12">
                            <h2 className="h4">{homepage.why_us_title}</h2>
                        </div>
                        {(homepage.why_us_content).map((why_us_item, index) => {
                            return (
                                <motion.div className="col-md-3" key={index}
                                            initial="hidden" whileInView="visible"
                                            viewport={{once: true}} key={index} variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 100
                                    },
                                    visible: {
                                        y: 0,
                                        opacity: 1,
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
            <section className="container-fluid success_cases_section">
                <div className="container">
                    <div className="row name_section">
                        <div className="col-12">
                            <h2 className="h4">Success Cases</h2>
                        </div>
                    </div>
                    <div className="row">
                        <ul className="category_blog">
                            <li className="active">
                                All
                            </li>
                            {
                                (category.map((category) => {
                                    return (
                                        <li key={category.id}>
                                            <Link href={`/blog/${category.slugs[0]}`}>{category.data.name}</Link>
                                        </li>
                                    )
                                }))
                            }
                        </ul>
                    </div>
                </div>
                <div className="project_slider">
                    <Slider {...settings_top}>
                        {
                            (top_slider.map((project) => {
                                return (
                                    <div key={project.id}>
                                        <div
                                            className='projects_slider_item'
                                            style={{backgroundImage: "url(" + project.data.slider_image.url + ")"}}>
                                            <h2>{project.data.title}</h2>
                                        </div>
                                    </div>
                                )
                            }))
                        }
                    </Slider>
                </div>
                <div className="project_slider">
                    <Slider {...settings_bottom}>
                        {
                            (bottom_slider.map((project) => {
                                return (
                                    <div key={project.id}>
                                        <div
                                            className='projects_slider_item'
                                            style={{backgroundImage: "url(" + project.data.slider_image.url + ")"}}>
                                            <h2>{project.data.title}</h2>
                                        </div>
                                    </div>
                                )
                            }))
                        }
                    </Slider>
                </div>
            </section>
            <section className="home_success_logo_section">
                <div className="container">
                    <div className="row">
                        {(homepage.success_logo).map((success_logo, index) => {
                            return (
                                <motion.div
                                    initial="hidden" whileInView="visible"
                                    viewport={{once: true}} key={index} variants={{
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
                                    <div className="home_success_logo_img">
                                        {success_logo.success_link.link_type == "Web" ? <a href="#"><img src={success_logo.success_logo_image.url} alt=""/></a> : <img src={success_logo.success_logo_image.url} alt=""/>}
                                    </div>
                                </motion.div>
                            )
                        })
                        }
                    </div>
                </div>
            </section>
            <section className="home_our_clients_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h2 className="h4">{homepage.clients_title}</h2>
                            {(homepage.reviews).map((review, index) => {
                                return(
                                    <div className="home_review" key={index}>
                                        <div className="home_review_logo">
                                            <img src={review.review_logo.url} alt={review.review_logo.alt}/>
                                            <img src="/quotes.svg" alt="quotes" className="home_review_quotes"/>
                                        </div>
                                        <div className="home_review_content">
                                            {RichText.render(review.review_content)}
                                        </div>
                                        <div className="home_review_position">
                                            <img src={review.review_foto.url} alt={review.review_foto.alt}/>
                                            <div>
                                               <h6>{review.review_name}</h6>
                                                <p>{review.review_position}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-md-4">
                            <div className="home_our_clients_white_block">
                                {RichText.render(homepage.clients_white_section)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home_bottom_full_image_section">
                {homepage.bottom_image.hasOwnProperty('url') ?
                    <motion.div
                        initial="hidden" whileInView="visible"
                        viewport={{once: true}} variants={{
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
                                duration: 0.8
                            }
                        }
                    }}
                    ><Image
                        loader={myLoader}
                        src={homepage.bottom_image.url}
                        alt={homepage.bottom_image.alt}
                        width={homepage.bottom_image.dimensions.width}
                        height={homepage.bottom_image.dimensions.height}
                    /></motion.div> : ''}
            </section>
            <section className="home_about_as">
                 <div className="container">
                     <div className="row">
                         <div className="col-12">
                             <h2 className="h4">{homepage.about_title}</h2>
                         </div>
                         <div className="col-md-8">
                             {RichText.render(homepage.about_content)}
                             <div className="d-flex">
                                 <a href="#">Get In Touch</a>
                                 <a href="#">Go To Blog</a>
                             </div>
                         </div>
                         <div className="col-md-4">
                             <a href="https://www.instagram.com/paspartooteam/">@paspartooteam</a>
                             <h5>Follow us on Instagram</h5>
                         </div>
                     </div>
                 </div>
            </section>
        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const homepage = await client.query(Prismic.Predicates.at('document.type', 'homepage'))
    const project = await client.query(Prismic.Predicates.at('document.type', 'project'))
    const category = await client.query(Prismic.Predicates.at('document.type', 'projects_category'))
    return {
        props: {
            homepage: homepage,
            projects: project,
            category: category
        }
    };
}