import React, {useState} from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import {RichText} from "prismic-reactjs";
import ContactForm from '../../components/ContactForm'
import {BsArrowUpRightCircle} from "react-icons/bs";
import WeBuild from "../../components/WeBuild";



export default function OurProjects ({our_projects, projects, category, header_footer}) {
    header_footer = header_footer
    our_projects = our_projects.results[0].data
    projects = projects.results
    category = category.results
    const [countPosts, setCountPosts] = useState(3);
    const [first_projects, setFirst_projects] = useState(()=>projects.slice(0, countPosts));
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
                                    <li className="active">
                                        <span>All</span>
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
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                            {countPosts < projects.length ? <button onClick={() => {
                                setFirst_projects(projects.slice(0, countPosts+3))
                                setCountPosts(countPosts+3)
                            }} className="load_more">load more</button>: ''}
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


export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const our_projects = await client.query(Prismic.Predicates.at('document.type', 'our_projects'))
    const project = await client.query(Prismic.Predicates.at('document.type', 'project'))
    const category = await client.query(Prismic.Predicates.at('document.type', 'projects_category'))
    return {
        props: {
            header_footer:header_footer,
            our_projects:our_projects,
            projects: project,
            category: category
        }
    };
}
