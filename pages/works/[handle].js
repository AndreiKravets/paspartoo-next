import React from 'react';
import MainContainer from "../../components/MainContainer";
import Prismic from "@prismicio/client";
import Image from "next/image";


const Work =  ({data}) => {


    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return(
        <>
                <MainContainer>

                </MainContainer>
        </>
            )

}
export default Work;
export async function getServerSideProps({ query }) {
       const productId = query.handle;

       const client = Prismic.client("https://sikacci.prismic.io/api/v2", {})
       const data = await client.query(Prismic.Predicates.at('document.type', productId))

       return { props: { data: data }};
}