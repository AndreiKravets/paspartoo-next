import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import React from "react";
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import {motion} from "framer-motion";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
import Slider from "react-slick";
import WeBuild from "../components/WeBuild";
import InstagramFeed from "react-ig-feed";
import 'react-ig-feed/dist/index.css'

export default function About ({ about, our_projects, header_footer }) {
    header_footer = header_footer
    about = about.results[0].data
    const meta = about.body[0].primary
    our_projects = our_projects.results[0].data
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    const slider_logo = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
        swipeToSlide: true,
        slidesToScroll: 1
    }
    const slider_our_team = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        // autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    centerMode: false,
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1500,
                settings: {
                    centerMode: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1360,
                settings: {
                    centerMode: false,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 940,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                }
            }
        ]
    }


    const variants = {
        hidden_1: {scale: 1, y: -1000, opacity: 0.5},
        enter_1: {scale: 1, y: 0, opacity: 1, transition: {type: "spring", bounce: 0.4, duration: 0.7}},
        hidden_2: {scale: 1, x: 1000, opacity: 0.5},
        enter_2: {scale: 1, x: 0, opacity: 1, transition: {type: "spring", bounce: 0.4, duration: 0.8}}
    }

    return (
        <MainContainer  header_footer={header_footer} title={meta.title} isVisible={meta.is_visible}
                        description={meta.description} keywords={meta.keywords}>
            <section className="container-fluid about_top_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 about_top_section_content">
                            {RichText.render(about.title)}
                            <p>{about.content}</p>

                            <Slider {...slider_logo}>
                                {
                                    (about.logo_slider.map((logo, index) => {
                                        return (
                                            <div key={index}>
                                                <div>
                                                    <img src={logo.logo.url} alt={logo.logo.alt} />
                                                </div>
                                            </div>
                                        )
                                    }))
                                }
                            </Slider>
                        </div>
                        <div className="col-md-5 about_top_section_image">
                            {about.top_image.hasOwnProperty('url') ?
                                <motion.div className = "about_top_image"
                                    variants={variants}
                                    initial="hidden_1"
                                    animate="enter_1"
                                    transition={{type: 'linear'}}
                                ><Image
                                    loader={myLoader}
                                    src={about.top_image.url}
                                    alt={about.top_image.alt}
                                    width={about.top_image.dimensions.width}
                                    height={about.top_image.dimensions.height}
                                /></motion.div> : ''}
                            {about.bottom_image.hasOwnProperty('url') ?
                                <motion.div className = "about_left_image"
                                    variants={variants}
                                    initial="hidden_2"
                                    animate="enter_2"
                                    transition={{type: 'linear'}}
                                ><Image
                                    loader={myLoader}
                                    src={about.bottom_image.url}
                                    alt={about.bottom_image.alt}
                                    width={about.bottom_image.dimensions.width}
                                    height={about.bottom_image.dimensions.height}
                                /></motion.div> : ''}
                        </div>
                    </div>
                </div>
            </section>

            <section className='container-fluid our_postulate_section'>
                <div className="container">
                    <h5>{about.our_postulate_name}</h5>
                    <h3>{about.our_postulate_title}</h3>
                    <div className="row">
                        {
                            (about.we_are.map((item, index) => {
                                return (
                                    <motion.div key={index} className='col-lg-3 col-md-6 col-sm-6'
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
                                                delay: .07 * index,
                                                type: "spring",
                                                bounce: 0.4,
                                                duration: .8
                                            }
                                        }
                                    }}>
                                        <div>
                                          <h4>.<span>we are</span></h4>
                                          <h4>{item.we_are_title}</h4>
                                        </div>
                                        <div>
                                           <p>{item.we_are_content}</p>
                                        </div>
                                    </motion.div>
                                )
                            }))
                        }
                    </div>
                </div>
            </section>

            <section className='container-fluid our_team_section'>
                <div className="container">
                   <h2 className="h5">{about.our_team_name}</h2>
                </div>
             <div className="our_team_slider">
              <Slider {...slider_our_team}>
                {
                    (about.our_team.map((slide, index) => {
                        return (
                            <div key={index} className='our_team_slide'>
                                <div className='our_team_slide_inner'>
                                <div className='team_slide_top'>
                                  <h2>{slide.name}</h2>
                                    <h5>{slide.position}</h5>
                                </div>
                                <div className={`team_slide_bottom ${slide.gender}`}>
                                    <div className='slide_bottom_years'>
                                        <h3>{slide.years_of_experience}<span>+</span></h3>
                                        <h6>years of experience</h6>
                                    </div>
                                    <div className='slide_bottom_team'>
                                        team
                                    </div>
                                </div>
                                <img src={slide.photo.url} alt={slide.photo.alt}/>
                                </div>
                            </div>
                        )
                    }))
                }
              </Slider>
             </div>
            </section>
            <WeBuild our_projects={our_projects}/>
            <section className="instagram_section about_instagram_section">
                <InstagramFeed token="IGQVJWYmh6bllpaG1DUVhZAWHBzV283bkRrNzVMSTdMaDRWYjlCVEt4eHhMLUZALc0FlVmNaZAEswcjhrUW5HWEljeXRqa1cycHpURUplS3hJTVlMUV9uUzFoVmxsQVZANRkFldlo0SWI0ZAzZAfYTlqem9pdQZDZD"  counter="6"/>
            </section>
        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const our_projects = await client.query(Prismic.Predicates.at('document.type', 'our_projects'))
    const about = await client.query(Prismic.Predicates.at('document.type', 'about_us'))
    return {props: {
            header_footer:header_footer,
            our_projects: our_projects,
            about: about
    }}
}