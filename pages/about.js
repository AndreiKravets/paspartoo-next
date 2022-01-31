import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import React from "react";
import Image from 'next/image'
import {RichText} from "prismic-reactjs";

export default function About({ data }) {
const about = data.results[0].data

    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <MainContainer>
            <div className="container-fluid about_top_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                         <h1>{about.title[0].text}</h1>
                            {RichText.render(about.content)}
                        </div>
                        <div className="col-md-6">
                            <Image
                                loader={myLoader}
                                src={`${about.banner.url}`}
                                alt={about.banner.alt}
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://sikacci.prismic.io/api/v2", {})
    const data = await client.query(Prismic.Predicates.at('document.type', 'about'))
    return {props: {data: data}}
}