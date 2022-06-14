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



export default function OurProjects ({query_category, projects, category, header_footer}) {
    header_footer = header_footer
    query_category = query_category
    projects = projects.results
    category = category.results
    console.log(category)
    const category_projects = projects.filter((item) => item.data.categories[0].category.slug == query_category)
    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
            <MainContainer header_footer={header_footer}
                           // title={meta.title} isVisible={meta.is_visible}
                           // description={meta.description} keywords={meta.keywords} og_locale={meta.og_locale}
                           // og_type={meta.og_type} og_title={meta.og_title} og_description={meta.og_description}
                           // og_url={meta.og_url} og_site_name={meta.og_site_name} twitter_card={meta.twitter_card}
                           // twitter_description={meta.twitter_description} twitter_title={meta.twitter_title}
                           // twitter_image={meta.twitter_image} msapplication_tileimage={meta.msapplication_tileimage}
            >
                <section className="container_fluid our_projects_section">
                    <div className="container">
                        <div className="col-12">
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
                                                <Link href={`/services/${project.data.categories[0].category.slug}/${project.uid}`}><a className="h3">{project.data.title}<BsArrowUpRightCircle/></a></Link>
                                                {RichText.render(project.data.short_description)}
                                                <div className="technologies_used">

                                                </div>
                                                </div>
                                            </div>

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


export async function getServerSideProps({ query }) {
    const query_category = query.category;
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const project = await client.query(Prismic.Predicates.at('document.type', 'services'))
    const category = await client.query(Prismic.Predicates.at('document.type', 'services_category'))
    return {
        props: {
            header_footer:header_footer,
            query_category:query_category,
            projects: project,
            category: category
        }
    };
}
