import React from 'react';
import MainContainer from "../../../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";
import Image from "next/image";
import {motion} from "framer-motion";
import RecentProjects from "../../../components/RecentProjects";




const Post = ({project, header_footer, projects}) => {
    projects = projects.results
    console.log(projects.results)
    header_footer = header_footer
    project = project.results[0].data
    console.log(project)
    const myLoader = ({ src, width, quality }) => {
            return `${src}?w=${width}&q=${quality || 75}`
        }
    return (
        <>
            <MainContainer header_footer={header_footer}>
                <section className="container-fluid project_top_section">
                <Image
                                                                               loader={myLoader}
                                                                               src={project.banner.url}
                                                                               alt={project.banner.alt}
                                                                               width={project.banner.dimensions.width}
                                                                               height={project.banner.dimensions.height}
                                                                           />
                   <div className="container">
                        <h1>{project.title}</h1>
                    </div>
                </section>
                <section className="project_about_section">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6 project_about_section_left">
                                          {RichText.render(project.about_case_content)}
                                          {project.website.link_type == "Web" ? <a href={project.website.url} target="_blank">VISIT THE WEBSITE</a> : ''}
                      </div>
                      <div className="col-lg-6 project_about_section_right">
                      <div>
                         <h2>Project Summary</h2>
                         {RichText.render(project.project_summary_list)}
                      </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="project_big_image_section">
                 <div className="container">
                   <div className="row">
                          <motion.div className="big_image_left col-sm-6"
                                                  initial="hidden" whileInView="visible"
                                                  viewport={{once: true}}  variants={{
                                          hidden: {
                                              opacity: 0,
                                              y: 100
                                          },
                                          visible: {
                                              y: 0,
                                              opacity: 1,
                                              transition: {
                                                  delay: .2,
                                                  type: "spring",
                                                  bounce: 0.4,
                                                  duration: .8
                                              }
                                          }
                                      }}>
                                    <Image
                                        loader={myLoader}
                                        src={project.big_image_left.url}
                                        alt={project.big_image_left.alt}
                                        width={project.big_image_left.dimensions.width}
                                        height={project.big_image_left.dimensions.height}
                                    />
                                    </motion.div>
                                     <motion.div className="big_image_right col-sm-6"
                                                  initial="hidden" whileInView="visible"
                                                  viewport={{once: true}}  variants={{
                                          hidden: {
                                              opacity: 0,
                                              y: 100
                                          },
                                          visible: {
                                              y: 0,
                                              opacity: 1,
                                              transition: {
                                                  delay: .3,
                                                  type: "spring",
                                                  bounce: 0.4,
                                                  duration: .8
                                              }
                                          }
                                      }}>
                                    <Image
                                        loader={myLoader}
                                        src={project.big_image_right.url}
                                        alt={project.big_image_right.alt}
                                        width={project.big_image_right.dimensions.width}
                                        height={project.big_image_right.dimensions.height}
                                    />
                               </motion.div>
                    </div>
                 </div>
                </section>
                 <section className="project_paspartoo_made_section">
                  <div className="container">
                   <div className="row">
                   <div className="col-lg-6 project_paspartoo_made_section_left">
                   {RichText.render(project.paspartoo_made)}
                   </div>
                   <div className="col-lg-6 project_paspartoo_made_section_right">
                            {
                                (project.paspartoo_made_item.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <h3>{item.paspartoo_made_count}<span>+</span></h3>
                                            <h5>{item.paspartoo_made_name}</h5>
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
                 <RecentProjects project_slider={projects} />
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
    const projects = await client.query(Prismic.Predicates.at('document.type', 'project'))
    return {props: {
            projects:projects,
            header_footer:header_footer,
            productId: productId,
            project: project
        }}
}
