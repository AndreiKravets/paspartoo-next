import React from 'react';
import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import Image from "next/image";


export default function Home({homepage}) {
    homepage = homepage.results[0].data
    console.log(homepage)

    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <MainContainer>
            <section className="container-fluid home_top_section">
                <video autoPlay muted loop id="myVideo">
                    <source src={`${homepage.home_top_background.url}`} type="video/mp4"/>
                </video>
                <div>
                    {RichText.render(homepage.home_top_content)}
                </div>
            </section>
            <section className="container-fluid home_content_section">
                <div className="container">
                    {RichText.render(homepage.key_services_title)}
                    <div className="row">
                    {(homepage.key_services_group).map((key_service,index) =>{
                        return(
                            <div className="col-md-3" key={index}>
                                <Image
                                    loader={myLoader}
                                    src={key_service.icon.url}
                                    alt={key_service.title[0].text}
                                    width={200}
                                    height={200}
                                />
                                <h3>{key_service.title[0].text}</h3>
                            </div>
                        )
                    })
                    }
                    </div>
                </div>
            </section>


            {/*<InstagramEmbed*/}
            {/*    url='https://www.instagram.com/p/B8qn8hJFD5K/'*/}
            {/*    clientAccessToken='326011549072699|IGQVJYeTVKampjVUF2dXJYZAVVSY2JhakY1WmlSOVNpQjdpU1AxRmFLVElKNlhXSTBmMGhybURIb0NvMmYxTFZA4X0JZAd0dXelRtUnBFU2dCaURjcnZAzWmVYS1ZAnbTE4MnhNc1Q1YWxrWkNudWFjdVo2WAZDZD'*/}
            {/*    maxWidth={320}*/}
            {/*    hideCaption={true}*/}
            {/*    containerTagName='div'*/}
            {/*    protocol=''*/}
            {/*    injectScript*/}
            {/*    onLoading={() => {}}*/}
            {/*    onSuccess={() => {}}*/}
            {/*    onAfterRender={() => {}}*/}
            {/*    onFailure={() => {}}*/}
            {/*/>*/}
        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const homepage = await client.query(Prismic.Predicates.at('document.type', 'homepage'))

    return {
        props: {
            homepage: homepage
        }
    };
}