import React from 'react';
import MainContainer from "../../../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import RecentProjects from "../../../components/RecentProjects";




const Post = ({project, header_footer, category, projects}) => {
    projects = projects.results
    console.log(projects)
    header_footer = header_footer
    project = project.results[0].data
    category = category.results
    const meta = project.body[0].primary
    const myLoader = ({ src, width, quality }) => {
            return `${src}?w=${width}&q=${quality || 75}`
        }
    return (
        <>
            <MainContainer header_footer={header_footer} title={meta.title} isVisible={meta.is_visible}
                           description={meta.description} keywords={meta.keywords} og_locale={meta.og_locale}
                           og_type={meta.og_type} og_title={meta.og_title} og_description={meta.og_description}
                           og_url={meta.og_url} og_site_name={meta.og_site_name} twitter_card={meta.twitter_card}
                           twitter_description={meta.twitter_description} twitter_title={meta.twitter_title}
                           twitter_image={meta.twitter_image} msapplication_tileimage={meta.msapplication_tileimage}>
                <section className="container-fluid project_top_section">
                           <Image
                               loader={myLoader}
                               src={project.banner.url}
                               alt={project.banner.alt}
                               width={project.banner.dimensions.width}
                               height={project.banner.dimensions.height}
                            />
                         <div className="container">
                              <h1 className="h2">{project.title}</h1>
                                 <ul>
                                    {
                                       (project.categories.map((item_category) => {
                                            return(
                                               (category.map((category) => {
                                                 return(
                                                    ( category.slugs[0] == item_category.category.slug ?
                                                        <li key={category.id}>
                                                            <Link href={`/our-projects/${category.slugs[0]}`}>{category.data.name}</Link>
                                                         </li> : "")
                                                            )
                                                })))
                                         }))
                                    }
                                 </ul>
                          </div>
                </section>
                <section className="project_about_section">
                         <div className="container">
                             <div className="row">
                                 <div className="col-lg-6 project_about_section_left">                                                                                                                                               {RichText.render(project.about_case_content)}
                                    {project.website.link_type == "Web" ?
                                      <a href={project.website.url} target="_blank">VISIT THE WEBSITE</a> : ''}
                                 </div>
                                 <div className="col-lg-6 project_about_section_right">
                                    <div>
                                      <h3>Project Summary</h3>
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
                                           hidden: {opacity: 0, y: 100},
                                           visible: {y: 0, opacity: 1,
                                              transition: {delay: .2, type: "spring", bounce: 0.4, duration: .8}
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
                                        viewport={{once: true}}
                                        variants={{
                                          hidden: {opacity: 0, y: 100},
                                          visible: {y: 0, opacity: 1,
                                          transition: {delay: .3, type: "spring", bounce: 0.4, duration: .8}
                                        }}}>
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
                                  }))}
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
                                   <Image loader={myLoader}
                                      src={item.last_section_image.url}
                                      alt={item.last_section_image.alt}
                                      width={item.last_section_image.dimensions.width}
                                      height={item.last_section_image.dimensions.height}
                                    />
                              </div>
                         )}))
                        }
                       </div>
                   </section>
                   <section className="project_recent_projects">
                      <div className="container">
                        <div className="row">
                          <div className="col-12">
                            <div>
                               <h5>#RECENT PROJECTS</h5>
                            </div>
                           </div>
                         </div>
                       </div>
                        <RecentProjects project_slider={projects} project_category = {category}/>
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
    const projects = await client.query(Prismic.Predicates.at('document.type', 'project'))
    const category = await client.query(Prismic.Predicates.at('document.type', 'projects_category'))
    return {props: {
            projects:projects,
            header_footer:header_footer,
            productId: productId,
            project: project,
            category: category
        }}
}
