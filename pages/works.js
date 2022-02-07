import React from 'react';
import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";



const Works = ({data}) => {
console.log(data)
    return (
        <>
        <MainContainer>
           <h1>Works</h1>
        </MainContainer>
        </>
    )
}

export default Works

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const blog = await client.query(Prismic.Predicates.at('document.type', 'blog_post'))
    return {props: {data: blog}}
}
