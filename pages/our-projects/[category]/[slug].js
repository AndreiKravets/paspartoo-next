import React from 'react';
import MainContainer from "../../../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";
import Image from "next/image";


const Post = ({project, header_footer}) => {
    header_footer = header_footer
    project = project.results[0].data
    console.log(project)
    const myLoader = ({ src, width, quality }) => {
            return `${src}?w=${width}&q=${quality || 75}`
        }
    return (
        <>
            <MainContainer header_footer={header_footer}>
                <section className="container-fluid project_top_section" style={{backgroundImage: "url(" + project.banner.url + ")"}}>
                   <div className="container">
                        <h1>{project.title}</h1>
                       {project.website.link_type == "Web" ? <a href={project.website.url} target="_blank">VISIT THE WEBSITE</a> : ''}
                    </div>
                </section>
                <section className="project_about_section">
                  <div className="container">
                    <div className="row">
                     <div className="col-12">
                      <h3>#about case</h3>
                     </div>
                    </div>
                    <div className="row">
                      <div className="col-md-7">
                      <Image
                                              loader={myLoader}
                                              src={project.preview_image.url}
                                              alt={project.preview_image.alt}
                                              width={project.preview_image.dimensions.width}
                                              height={project.preview_image.dimensions.height}
                                          />
                                          {RichText.render(project.about_case_content)}
                      </div>
                      <div className="col-md-5">
                      <div>
                         <h2>Project Summary</h2>
                         {RichText.render(project.project_summary_list)}
                      </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="project_big_image_section">
                 <div className="container"><Image
                                                               loader={myLoader}
                                                               src={project.big_image.url}
                                                               alt={project.big_image.alt}
                                                               width={project.big_image.dimensions.width}
                                                               height={project.big_image.dimensions.height}
                                                           />
                 </div>
                </section>
                 <section className="project_paspartoo_made_section">
                  <div className="container">
                   <div className="row">
                   <div className="col-md-6">
                   {RichText.render(project.paspartoo_made)}
                   </div>
                   <div className="col-md-6">
                            {
                                (project.paspartoo_made_item.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <h3>{item.paspartoo_made_count}</h3>
                                            <h6>{item.paspartoo_made_name}</h6>
                                        </div>

                                    )
                                }))
                            }
                   </div>
                   </div>
                  </div>
                </section>
                <section className="project_last_section">
                  <div className="container">
                             {
                                 (project.last_section.map((item, index) => {
                                     return (
                                         <div key={index}>
                                             <Image
                                                   loader={myLoader}
                                                   src={item.last_section_image.url}
                                                   alt={item.last_section_image.alt}
                                                   width={item.last_section_image.dimensions.width}
                                                   height={item.last_section_image.dimensions.height}
                                               />
                                         </div>

                                     )
                                 }))
                             }
                  </div>
                 </section>
            </MainContainer>
        </>
    )
}

export default Post

export async function getServerSideProps({ query }) {
    const productId = query.slug;
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const project = await client.query(Prismic.Predicates.at('my.project.uid', productId))
    return {props: {
            header_footer:header_footer,
            productId: productId,
            project: project
        }}
}
