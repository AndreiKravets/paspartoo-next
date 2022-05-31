import React from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import {RichText} from "prismic-reactjs";
import {BsArrowUpRightCircle} from "react-icons/bs";
import WeBuild from "../../components/WeBuild";
import ContactForm from "../../components/ContactForm";



export default function OurProjects ({query_category, our_projects, projects, category, header_footer}) {
    header_footer = header_footer
    query_category = query_category
    our_projects = our_projects.results[0].data
    projects = projects.results
    category = category.results
    const category_projects = projects.filter((item) => item.data.categories[0].category.slug == query_category)
    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
            <MainContainer header_footer={header_footer}>
                <section className="container_fluid our_projects_section">
                    <div className="container">
                        <div className="col-12">
                            <h1 className="h2">{our_projects.title}</h1>
                            <div className="row">
                                <ul className="category_blog">
                                    <li>
                                        <Link href={`/our-projects`}> All </Link>
                                    </li>
                                    {
                                        (category.map((category) => {
                                            return (
                                                <>
                                                {category.slugs == query_category ?
                                                <li key={category.id} className="active"><span>{category.data.name}</span></li> :
                                                    <li key={category.id}><Link href={`/our-projects/${category.slugs}`}>{category.data.name}</Link></li>

                                                }
                                                </>
                                            )
                                        }))
                                    }
                                </ul>
                            </div>
                            {
                                (category_projects.map((project) => {
                                    return (
                                        <div className="row projects_row" key={project.id}>
                                            <div className="col-lg-5">
                                                <div className="projects_row_inner">
                                                <Link href={`/our-projects/${project.data.categories[0].category.slug}/${project.uid}`}><a className="h3">{project.data.title}<BsArrowUpRightCircle/></a></Link>
                                                {RichText.render(project.data.short_description)}
                                                <div className="technologies_used">
                                                    {
                                                        (project.data.technologies_used.map((technologies, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <img src={technologies.technologies_used_image.url} />
                                                                    <p>{technologies.technologies_used_name}</p>
                                                                </div>
                                                            )
                                                        }))
                                                    }
                                                </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-7 projects_row_image">
                                                <div className="projects_row_image_inner" style={{backgroundImage: "url(" + project.data.preview_image.url + ")"}}>

                                                </div>
                                                {/*<Image*/}
                                                {/*    loader={myLoader}*/}
                                                {/*    src={project.data.slider_image.url}*/}
                                                {/*    alt={project.data.slider_image.alt}*/}
                                                {/*    width={project.data.slider_image.dimensions.width}*/}
                                                {/*    height={project.data.slider_image.dimensions.height}*/}
                                                {/*/>*/}
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                        </div>

                    </div>

                </section>
                <WeBuild our_projects={our_projects}/>
                <section className="projects_form_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 projects_form_section_title">
                                <h2>{our_projects.form_title}</h2>
                            </div>
                            <div className="col-lg-6 projects_form_section_form">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>

            </MainContainer>
        </>
    )
}


export async function getServerSideProps({ query }) {
    const query_category = query.category;
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const our_projects = await client.query(Prismic.Predicates.at('document.type', 'our_projects'))
    const project = await client.query(Prismic.Predicates.at('document.type', 'project'))
    const category = await client.query(Prismic.Predicates.at('document.type', 'projects_category'))
    return {
        props: {
            header_footer:header_footer,
            query_category:query_category,
            our_projects:our_projects,
            projects: project,
            category: category
        }
    };
}
