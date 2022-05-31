import React from 'react';
import MainContainer from "../../../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";
import ContactForm from "../../../components/ContactForm"



const Post = ({blog, header_footer}) => {
    header_footer = header_footer
    blog = blog.results[0].data
    return (
        <>
            <MainContainer header_footer={header_footer}>
                <section className="post_top_section" style={{backgroundImage: "url(" + blog.banner.url + ")"}}>
                                <div className="container">
                                    <h1 className="h2">{blog.title[0].text}</h1>
                                 </div>
                </section>
                <section className="post_section">
                                    <div className="container-fluid">
                                     <div className="container">
                                       <div className="row">
                                        <div className="col-12">
                                          {RichText.render(blog.top_content)}
                                        </div>
                                     </div>
                                     </div>
                                    </div>
                    <div className="container">
                        <div className="row">
                        <div className="col-12">
                          {RichText.render(blog.content)}
                          </div>
                        </div>
                    </div>

                </section>
                  <section className="projects_form_section">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-6 projects_form_section_title">
                                                <h2>Ready to discuss your project?</h2>
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

export default Post

export async function getServerSideProps({ query }) {
    const productId = query.slug;
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const blog = await client.query(Prismic.Predicates.at('my.blog_post.uid', productId))
    return {props: {
            header_footer:header_footer,
            productId: productId,
            blog: blog
        }}
}
