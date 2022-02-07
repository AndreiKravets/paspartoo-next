import React from 'react';
import MainContainer from "../../../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from "prismic-reactjs";



const Post = ({blog}) => {
    blog = blog
    console.log(blog)
    return (
        <>
            <MainContainer>
                <section className="container post_top_section">

                </section>
                <section className="blog_section">
                    <div className="container">
                        <div className="row">
                          {RichText.render(blog.results[0].data.content)}
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
    const blog = await client.query(Prismic.Predicates.at('my.blog_post.uid', productId))
    return {props: {
            productId: productId,
            blog: blog
        }}
}
