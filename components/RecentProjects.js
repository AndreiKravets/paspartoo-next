import React from 'react'
import Slider from "react-slick";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
import Link from "next/link";


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
export default function RecentProjects ({project_slider, project_category}) {

    project_slider = project_slider
    project_category = project_category
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
                                                            <Link href={`/our-projects/${project.data.categories[0].category.slug}/${project.uid}`}><a className="h3">{project.data.title}</a></Link>
                                                            <ul>
                                                                {
                                                                    (project.data.categories.map((item_category) => {
                                                                                return(
                                                                                    (project_category.map((category) => {
                                                                                            return(
                                                                                                ( category.slugs[0] == item_category.category.slug ?
                                                                                                    <li key={category.id}>
                                                                                                        <Link href={`/our-projects/${category.slugs[0]}`}>{category.data.name}</Link>
                                                                                                    </li>
                                                                                                    : "")
                                                                                            )
                                                                                        })
                                                                                    )
                                                                                )
                                                                            }
                                                                        )
                                                                    )
                                                                }
                                                            </ul>
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