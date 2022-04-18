import React from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Link from "next/link"


const Index = ({blog, category, productId, header_footer}) => {
    header_footer = header_footer
    blog = blog.results
    category = category.results

    let categoryBlog = blog.filter((item) => item.data.categories[0].category.slug == productId)
    return (
        <>
            <MainContainer header_footer={header_footer}>
                <section className="container blog_top_section">
                    <div>
                        <h1>Blog</h1>
                    </div>
                </section>
                <section className="blog_section">
                    <div className="container">
                        <ul className="category_blog">
                            <li className="active">
                                <Link href="/blog">All</Link>
                            </li>
                            {
                                (category.map((category) => {
                                    return(
                                        <li key={category.id}>
                                            <Link href={`/blog/${category.slugs[0]}`}>{category.data.name}</Link>
                                        </li>
                                    )
                                }))
                            }
                        </ul>
                        <div className="row">
                            {
                                (categoryBlog.map((item) => {
                                    return(
                                    <article className="col-md-4" key={item.id} >
                                        <div className="blog_item_inner">
                                            <img src={item.data.background_image.url} alt={item.data.background_image.alt}/>
                                            <a href={`/blog/${item.data.categories[0].category.slug}/${item.uid}`} className="h3">{item.data.title[0].text}</a>
                                        </div>
                                    </article>
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

export default Index

export async function getServerSideProps({ query }) {
    const productId = query.category;
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const blog = await client.query(Prismic.Predicates.at('document.type', 'blog_post'))
    const category = await client.query(Prismic.Predicates.at('document.type', 'category_blog'))
    return {props: {
            header_footer:header_footer,
            blog: blog,
            category: category,
            productId: productId
        }}
}
