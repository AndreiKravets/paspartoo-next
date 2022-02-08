import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import React from "react";
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import PrismicBody from "../prismic_sections/PrismicBody";

export default function About({ data }) {
const about = data.results[0].data
    console.log(about)
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <MainContainer>
            <section className="container service_top_section">
                {RichText.render(about.title)}
                <Image
                    loader={myLoader}
                    src={`${about.banner.url}`}
                    alt={about.banner.alt}
                    width={about.banner.dimensions.width}
                    height={about.banner.dimensions.height}
                />
            </section>

            <PrismicBody body={about.body}/>

        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const data = await client.query(Prismic.Predicates.at('document.type', 'about_us'))
    return {props: {data: data}}
}