import React, {useState, useEffect} from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Link from "next/link";


const Index = ({blog, category, header_footer}) => {
    header_footer = header_footer
    blog = blog.results
    category = category.results
    const first_posts = blog.slice(0, 4)
    console.log(first_posts)

    const [posts, setPosts] = useState(() => first_posts);

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
        let newPosts = posts.slice(current_page * count - count, current_page * count)
        return (newPosts)
    }
    return (
        <>
            <MainContainer header_footer={header_footer}>
                <section className="container blog_top_section">
                    <div>
                        <h1>Meet Insights</h1>
                    </div>
                </section>
                <section className="blog_section">
                    <div className="container">
                        {/*<ul className="category_blog">*/}
                        {/*    <li className="active">*/}
                        {/*        All*/}
                        {/*    </li>*/}
                        {/*    {*/}
                        {/*        (category.map((category) => {*/}
                        {/*            return(*/}
                        {/*                <li key={category.id}>*/}
                        {/*                    <Link href={`/blog/${category.slugs[0]}`}>{category.data.name}</Link>*/}
                        {/*                </li>*/}
                        {/*            )*/}
                        {/*        }))*/}
                        {/*    }*/}
                        {/*</ul>*/}
                        <div className="row">
                            <div className="col-md-7">
                                {
                                    (posts.map((item, index) => {
                                        return(
                                            <>
                                                { index == 0 ?
                                                    <article className="blog_left_article" key={item.id}>
                                                        <div className="blog_item_inner">
                                                            {item.data.background_image_big.url ?
                                                                <a href={`/blog/all/${item.uid}`}>
                                                                    <img src={item.data.background_image_big.url}
                                                                         alt={item.data.background_image_big.alt}/></a> : ''}
                                                            <a href={`/blog/all/${item.uid}`}
                                                               className="h3">{item.data.title[0].text}</a>
                                                        </div>
                                                    </article> : false}
                                            </>
                                        )
                                    }))
                                }
                            </div>
                            <div className="col-md-5">
                                {
                                    (posts.map((item, index) => {
                                        return(
                                            <>
                                                { index >0 ?
                                                    <article className="blog_right_article" key={item.id}>
                                                        <div className="blog_item_inner">
                                                            {item.data.background_image_small.url ?
                                                                <a href={`/blog/all/${item.uid}`}>  <img src={item.data.background_image_small.url}
                                                                                                         alt={item.data.background_image_small.alt}/></a> :''}
                                                            <a href={`/blog/all/${item.uid}`}
                                                               className="h4">{item.data.title[0].text}</a>
                                                        </div>
                                                    </article> : false}
                                            </>
                                        )
                                    }))
                                }
                            </div>
                        </div>
                        {createPagination(blog,4)}
                    </div>
                    <div className="container-fluid">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>ENHANCES <span>YOUR</span> INNOVATION</h2>
                                </div>
                                <div className="col-sm-6">
                                    <img src="/iPhone.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
