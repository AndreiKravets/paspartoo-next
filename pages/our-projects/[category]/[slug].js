import React from 'react';
import MainContainer from "../../../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";



const Post = ({project}) => {
    project = project.results[0].data
    console.log(project)
    return (
        <>
            <MainContainer>
                <section className="container post_top_section">

                </section>
                <section className="blog_section">
                    <div className="container">
                        <div className="row">
                          {project.title}
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
    const project = await client.query(Prismic.Predicates.at('my.project.uid', productId))
    return {props: {
            productId: productId,
            project: project
        }}
}
