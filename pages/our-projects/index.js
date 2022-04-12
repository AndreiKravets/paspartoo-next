import React from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import {RichText} from "prismic-reactjs";



export default function OurProjects ({our_projects, projects, category}) {
    our_projects = our_projects.results[0].data
    projects = projects.results
    category = category.results
    console.log(our_projects)
    const first_projects = projects.slice(0, 3)
    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
            <MainContainer>
                <section className="container_fluid our_projects_section">
                    <div className="container">
                        <div className="col-12">
                            <h1>{our_projects.title}</h1>
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
                            {
                                (first_projects.map((project) => {
                                    return (
                                        <div className="row" key={project.id}>
                                            <div className="col-md-8">
                                                <Link href={`/our-projects/${project.data.categories[0].category.slug}/${project.uid}`} className="h3">{project.data.title}</Link>
                                                {RichText.render(project.data.short_description)}
                                                <div className="technologies_used">
                                                    {
                                                        (project.data.technologies_used.map((technologies, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <img src={technologies.technologies_used_image.url} />
                                                                    {technologies.technologies_used_name}
                                                                </div>

                                                            )
                                                        }))
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <Image
                                                    loader={myLoader}
                                                    src={project.data.slider_image.url}
                                                    alt={project.data.slider_image.alt}
                                                    width={project.data.slider_image.dimensions.width}
                                                    height={project.data.slider_image.dimensions.height}
                                                />
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                        </div>

                    </div>

                </section>
                <section className="our_project_build container-fluid">
                    <div className="container">
                        <div className="row">
                            <h2 className="h4">{our_projects.we_build_title}</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                {RichText.render(our_projects.we_build_content)}
                            </div>
                            <div className="col-md-4">
                                <div className="build_count">
                                    {our_projects.we_build_count}
                                </div>
                                <h6>brands have trusted us</h6>
                            </div>
                        </div>
                        <div className="row">
                            {
                                (our_projects.clients_logo.map((logo, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={logo.logo.url} />
                                        </div>

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


export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const our_projects = await client.query(Prismic.Predicates.at('document.type', 'our_projects'))
    const project = await client.query(Prismic.Predicates.at('document.type', 'project'))
    const category = await client.query(Prismic.Predicates.at('document.type', 'projects_category'))
    return {
        props: {
            our_projects:our_projects,
            projects: project,
            category: category
        }
    };
}
