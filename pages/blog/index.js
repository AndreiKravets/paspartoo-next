import React, {useState, useEffect} from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Link from "next/link";
import {BsArrowRight, BsArrowLeft} from "react-icons/bs";
import {RichText} from "prismic-reactjs";



const Index = ({blog, blog_page, category, header_footer}) => {
    header_footer = header_footer
    blog = blog.results
    blog_page = blog_page.results[0].data
    const meta = blog_page.body[0].primary
    category = category.results
    console.log(blog_page)
    const first_posts = blog.slice(0, 4)
    const [posts, setPosts] = useState(() => first_posts);
    const [currentPage, setCurrentPage] = useState(1);

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
                                        <li key={index} onClick={() => (setPosts(currentPosts(posts, count, index)),setCurrentPage(index))}>
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
            <MainContainer header_footer={header_footer} title={meta.title} isVisible={meta.is_visible}
                           description={meta.description} keywords={meta.keywords} og_locale={meta.og_locale}
                           og_type={meta.og_type} og_title={meta.og_title} og_description={meta.og_description}
                           og_url={meta.og_url} og_site_name={meta.og_site_name} twitter_card={meta.twitter_card}
                           twitter_description={meta.twitter_description} twitter_title={meta.twitter_title}
                           twitter_image={meta.twitter_image} msapplication_tileimage={meta.msapplication_tileimage}>
                <section className="container blog_top_section">
                    <h1>Meet Insights</h1>
                        <div className="blog_arrows">
                         {currentPage >= 2 ? <BsArrowLeft onClick={() => (setPosts(currentPosts(blog, 4, currentPage-1)), setCurrentPage(currentPage-1))}/> : <BsArrowLeft className="none_page"/>}
                            {currentPage <= blog.length / 4 ? <BsArrowRight onClick={() => (setPosts(currentPosts(blog, 4, currentPage+1)), setCurrentPage(currentPage+1))}/> : <BsArrowRight className="none_page"/>}
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
                                                <Link href={`/blog/all/${item.uid}`}><a>
                                                    <img src={item.data.background_image_big.url}
                                                 alt={item.data.background_image_big.alt}/></a></Link> : ''}
                                            <Link href={`/blog/all/${item.uid}`}><a className="h3">{item.data.title[0].text}</a></Link>
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
                                                                <Link href={`/blog/all/${item.uid}`}><a><img src={item.data.background_image_small.url}
                                                                 alt={item.data.background_image_small.alt}/></a></Link> :''}
                                                            <Link href={`/blog/all/${item.uid}`}><a className="h4">{item.data.title[0].text}</a></Link>
                                                        </div>
                                                    </article> : false}
                                            </>
                                        )
                                    }))
                                }
                            </div>
                        </div>
                        {/*{createPagination(blog,4)}*/}
                    </div>
                    <div className="container-fluid">
                        <div className="container">
                            <div className="row">
                            <div className="col-sm-6">
                                {RichText.render(blog_page.blog_page_title)}
                            </div>
                            <div className="col-sm-6">
                                <img src={blog_page.blog_page_image.url} alt=""/>
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
    const blog_page = await client.query(Prismic.Predicates.at('document.type', 'posts'))
    const category = await client.query(Prismic.Predicates.at('document.type', 'category_blog'))
    return {props: {
            header_footer:header_footer,
            blog: blog,
            blog_page: blog_page,
            category: category
    }}
}
