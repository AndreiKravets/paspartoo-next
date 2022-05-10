import React from 'react'
import Slider from "react-slick";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";


const our_projects_slider = {
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
export default function RecentProjects ({project_slider}) {

    project_slider = project_slider
    console.log(project_slider)

    return(
        <>
            <section className="success_cases_section recent_projects_section">
                                <div className="project_slider">
                                    <Slider {...our_projects_slider}>
                                        {
                                            (project_slider.map((project) => {
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
        </>
    )
}