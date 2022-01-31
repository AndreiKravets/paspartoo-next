import React from 'react';
import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";



const Works = () => {

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
    const client = Prismic.client("https://sikacci.prismic.io/api/v2", {})
    const data = await client.query(Prismic.Predicates.at('document.type', 'contacts'))
    return {props: {data: data}}
}
