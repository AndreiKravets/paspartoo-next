import React from 'react';
import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import Image from "next/image";
import Link from "next/link"
import {motion} from "framer-motion";
import {BsChevronCompactRight, BsChevronCompactLeft} from "react-icons/bs";
import Slider from "react-slick";


export default function Home({homepage, projects, category, header_footer}) {
    header_footer = header_footer
    homepage = homepage.results[0].data
    projects = projects.results
    category = category.results
    // console.log(homepage)
    console.log(projects)
    // console.log(category)
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
        swipeToSlide: true,
        nextArrow: <BsChevronCompactRight/>,
        prevArrow: <BsChevronCompactLeft/>,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    centerMode: false,
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                }
            }
        ]
    }
    const settings_bottom = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        rtl:true,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        nextArrow: <BsChevronCompactRight/>,
        prevArrow: <BsChevronCompactLeft/>,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    centerMode: false,
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                }
            }
        ]
    }
    const settings_logo = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 3000,
        autoplaySpeed: 1,
        cssEase: 'linear',
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        nextArrow: <BsChevronCompactRight/>,
        prevArrow: <BsChevronCompactLeft/>,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    }
    const settings_review = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 1,
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
        <MainContainer header_footer={header_footer} title={meta.title} isVisible={meta.is_visible}
                       description={meta.description}>

            <section className="home_top_main_section">
                <div className="container home_top_section">
                    <div className="row">
                        <div className="col-md-4">
                            <motion.div initial="hidden" whileInView="visible"
                                        viewport={{once: true}} variants={{
                                hidden: {
                                    scale: .8,
                                    opacity: 0,
                                },
                                visible: {
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        delay: .2,
                                        type: "spring",
                                        bounce: 0.4,
                                        duration: 0.7
                                    }
                                }
                            }}>
                            {RichText.render(homepage.title)}
                            {homepage.subtitle ? <h2 className="h4 home_subtitle">{homepage.subtitle}</h2> : ''}
                            </motion.div>
                        </div>
                        <div className="col-md-8 home_top_image_warship">
                            {homepage.warship.hasOwnProperty('url') ?
                                <motion.div
                                    variants={variants}
                                    initial="hidden_1"
                                    animate="enter_1"
                                    transition={{type: 'linear'}}
                                ><Image
                                    loader={myLoader}
                                    src={homepage.warship.url}
                                    alt={homepage.warship.alt}
                                    width={homepage.warship.dimensions.width}
                                    height={homepage.warship.dimensions.height}
                                /></motion.div> : ''}
                        </div>
                        {/*<div className="col-md-6 home_top_image">*/}
                        {/*    {homepage.top_image_1.hasOwnProperty('url') ?*/}
                        {/*        <motion.div*/}
                        {/*            variants={variants}*/}
                        {/*            initial="hidden_1"*/}
                        {/*            animate="enter_1"*/}
                        {/*            transition={{type: 'linear'}}*/}
                        {/*        ><Image*/}
                        {/*            loader={myLoader}*/}
                        {/*            src={homepage.top_image_1.url}*/}
                        {/*            alt={homepage.top_image_1.alt}*/}
                        {/*            width={homepage.top_image_1.dimensions.width}*/}
                        {/*            height={homepage.top_image_1.dimensions.height}*/}
                        {/*        /></motion.div> : ''}*/}
                        {/*    {homepage.top_image_2.hasOwnProperty('url') ?*/}
                        {/*        <motion.div*/}
                        {/*            variants={variants}*/}
                        {/*            initial="hidden_2"*/}
                        {/*            animate="enter_2"*/}
                        {/*            transition={{type: 'linear'}}*/}
                        {/*        ><Image*/}
                        {/*            loader={myLoader}*/}
                        {/*            src={homepage.top_image_2.url}*/}
                        {/*            alt={homepage.top_image_2.alt}*/}
                        {/*            width={homepage.top_image_2.dimensions.width}*/}
                        {/*            height={homepage.top_image_2.dimensions.height}*/}
                        {/*        /></motion.div> : ''}*/}
                        {/*    {homepage.top_image_3.hasOwnProperty('url') ?*/}
                        {/*        <motion.div*/}
                        {/*            variants={variants}*/}
                        {/*            initial="hidden_3"*/}
                        {/*            animate="enter_3"*/}
                        {/*            transition={{type: 'linear'}}*/}
                        {/*        ><Image*/}
                        {/*            loader={myLoader}*/}
                        {/*            src={homepage.top_image_3.url}*/}
                        {/*            alt={homepage.top_image_3.alt}*/}
                        {/*            width={homepage.top_image_3.dimensions.width}*/}
                        {/*            height={homepage.top_image_3.dimensions.height}*/}
                        {/*        /></motion.div> : ''}*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="container home_key_section">
                    {/*<div className="row name_section">*/}
                    {/*    <div className="col-12">*/}
                    {/*        <h2 className="h4">{homepage.key_services_title}</h2>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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
                            <h2 className="h5">{homepage.why_us_title}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="why_us_container">
                                <div className="why_us_content_left">
                                    {(homepage.why_us_content_left).map((why_us_item, index) => {
                                        return (
                                            <div className="home_why_us_inner" key={index}>
                                                <motion.div initial="hidden" whileInView="visible"
                                                            viewport={{once: true}} variants={{
                                                    hidden: {
                                                        scale: .8,
                                                        opacity: 0,
                                                    },
                                                    visible: {
                                                        scale: 1,
                                                        opacity: 1,
                                                        transition: {
                                                            delay: .2,
                                                            type: "spring",
                                                            bounce: 0.4,
                                                            duration: 0.8
                                                        }
                                                    }
                                                }}>
                                                <img src={why_us_item.why_us_image_left.url} alt={why_us_item.why_us_image_left.alt}/>
                                                </motion.div>
                                                {RichText.render(why_us_item.why_us_item_left)}
                                            </div>

                                        )
                                    })
                                    }
                                </div>
                                <div className="why_us_content_center">
                                    {(homepage.why_us_content_center).map((why_us_item, index) => {
                                        return (
                                            <div className="home_why_us_inner" key={index}>
                                                <motion.div initial="hidden" whileInView="visible"
                                                            viewport={{once: true}} variants={{
                                                    hidden: {
                                                        scale: .8,
                                                        opacity: 0,
                                                    },
                                                    visible: {
                                                        scale: 1,
                                                        opacity: 1,
                                                        transition: {
                                                            delay: .2,
                                                            type: "spring",
                                                            bounce: 0.4,
                                                            duration: 0.8
                                                        }
                                                    }
                                                }}>
                                                <img src={why_us_item.why_us_image_center.url} alt={why_us_item.why_us_image_center.alt}/>
                                                </motion.div>
                                                <div>{RichText.render(why_us_item.why_us_item_center)}</div>
                                            </div>

                                        )
                                    })
                                    }
                                </div> 
                                <div className="why_us_content_right">
                                    {(homepage.why_us_content_right).map((why_us_item, index) => {
                                        return (
                                            <div className="home_why_us_inner" key={index}>
                                                <motion.div initial="hidden" whileInView="visible"
                                                            viewport={{once: true}} variants={{
                                                    hidden: {
                                                        scale: .8,
                                                        opacity: 0,
                                                    },
                                                    visible: {
                                                        scale: 1,
                                                        opacity: 1,
                                                        transition: {
                                                            delay: .2,
                                                            type: "spring",
                                                            bounce: 0.4,
                                                            duration: 0.8
                                                        }
                                                    }
                                                }}>
                                                <img src={why_us_item.why_us_image_right.url} alt={why_us_item.why_us_image_right.alt}/>
                                                </motion.div>
                                                {RichText.render(why_us_item.why_us_item_right)}
                                            </div>

                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid success_cases_section">
                <div className="container">
                    <div className="row name_section">
                        <div className="col-12">
                            <h2 className="h5">Success Cases</h2>
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
                                            <Link href={`/our-projects/${category.slugs[0]}`}>{category.data.name}</Link>
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
                                            <h3>{project.data.title}</h3>
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
                                            <h3>{project.data.title}</h3>
                                        </div>
                                    </div>
                                )
                            }))
                        }
                    </Slider>
                </div>
            </section>
            <section className="home_success_logo_section">
                <motion.div
                    initial="hidden" whileInView="visible"
                    viewport={{once: true}} variants={{
                    hidden: {
                        opacity: 0
                    },
                    visible: {
                        opacity: 1,
                        transition: {
                            delay: .2,
                            type: "spring",
                            duration: 0.8
                        }
                    }
                }}>
                <Slider {...settings_logo}>
                        {
                            (homepage.success_logo).map((success_logo, index) => {
                                return (
                                        <div className="home_success_logo_img" key={index}>
                                            {success_logo.success_link.link_type == "Web" ?
                                                <a href="#"><img src={success_logo.success_logo_image.url} alt=""/></a> :
                                                <img src={success_logo.success_logo_image.url} alt=""/>}
                                        </div>
                                )
                            })
                        }
                </Slider>
                            </motion.div>
                            </section>
            <section className="home_our_clients_section">
                <div className="container">
                    <div className="row">
                        <div className="col-12"><h2 className="h5">{homepage.clients_title}</h2></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <Slider {...settings_review}>
                            {(homepage.reviews).map((review, index) => {
                                return (
                                    <div className="home_review" key={index}>
                                        <div className="home_review_logo">
                                            <div className="home_review_position">
                                                <img src={review.review_foto.url} alt={review.review_foto.alt}/>
                                                <div>
                                                    <h6>{review.review_name}</h6>
                                                    <p>{review.review_position}</p>
                                                </div>
                                            </div>
                                            <img src="/quotes.svg" alt="quotes" className="home_review_quotes"/>
                                        </div>
                                        <div className="home_review_content">
                                            <img src={review.review_logo.url} alt={review.review_logo.alt}/>
                                            {RichText.render(review.review_content)}
                                        </div>
                                    </div>
                                )
                            })}
                            </Slider>
                        </div>
                        <div className="col-lg-6">
                            <div className="home_our_clients_white_block">
                                {RichText.render(homepage.clients_white_section)}
                                <div className="home_our_clients_white_block_logo">
                                {(homepage.clients_white_section_logo).map((section_logo, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={section_logo.white_section_logo.url} alt="" />
                                        </div>
                                    )
                                })}
                            </div>
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
                            <h2 className="h5">{homepage.about_title}</h2>
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
                            <h5>+ Follow us on Instagram</h5>
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
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    return {
        props: {
            header_footer: header_footer,
            homepage: homepage,
            projects: project,
            category: category
        }
    };
}