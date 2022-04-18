import React, {useState, useEffect} from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Link from "next/link";


const Index = ({blog, category, header_footer}) => {
    header_footer = header_footer
    blog = blog.results
    category = category.results
    console.log(blog)
    console.log(category)

    const [posts, setPosts] = useState(() => blog);

    function createPagination (posts, count)  {
        let paginationLength = [];
        for (let i = 1; i < posts.length / count + 1; i++) {
            paginationLength.push(i);
        }
        if (paginationLength.length > 1) {
            return(
                <section>
                    <div className="container">
                        <div className="row posts_pagination">
                            <ul>
                                {paginationLength.map((index) => {
                                    return (
                                        <li key={index} onClick={() => setPosts(currentPosts(posts, count, index))}>
                                            {index}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </section>
            )
        }
        return false
    }

    function currentPosts(posts, count, current_page ) {
        console.log(posts.slice(current_page * count - count, current_page * count))
        let newPosts = posts.slice(current_page * count - count, current_page * count)
        return (newPosts)
    }
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
                                All
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
                                (posts.map((item) => {
                                    return(
                                        <article className="col-md-4" key={item.id} >
                                            <div className="blog_item_inner">
                                                <img src={item.data.background_image.url} alt={item.data.background_image.alt}/>
                                                <a href={`/blog/all/${item.uid}`} className="h3">{item.data.title[0].text}</a>
                                            </div>
                                        </article>
                                    )
                                }))
                            }
                        </div>

                    </div>

                </section>
                    {createPagination(blog,6)}
            </MainContainer>
        </>
    )
}

export default Index

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const blog = await client.query(Prismic.Predicates.at('document.type', 'blog_post'))
    const category = await client.query(Prismic.Predicates.at('document.type', 'category_blog'))
    return {props: {
            header_footer:header_footer,
            blog: blog,
            category: category
    }}
}
