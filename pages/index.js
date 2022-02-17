import React from 'react';
import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import Image from "next/image";
import Link from "next/link"


export default function Home({homepage}) {
    homepage = homepage.results[0].data
    const meta = homepage.body_meta[0].primary
    console.log(homepage)

    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <MainContainer title={meta.title} isVisible={meta.is_visible} description={meta.description}>
            <section className="container home_top_section">
                <div className="row">
                    <div className="col-md-6">
                        {RichText.render(homepage.title)}
                    </div>
                    <div className="col-md-6">
                        <Image
                            loader={myLoader}
                            src={homepage.banner.url}
                            alt={homepage.banner.alt}
                            width={homepage.banner.dimensions.width}
                            height={homepage.banner.dimensions.height}
                        />
                    </div>
                </div>
            </section>
            <section className="container home_key_section">
               <h2 className="h4">{homepage.key_services_title}</h2>
                <div className="row">
                    {(homepage.body_key).map((key_service,index) =>{
                        return(
                            <div className={key_service.primary.block} key={index}>
                    <Image
                        loader={myLoader}
                        src={key_service.primary.card_background.url}
                        alt={key_service.primary.card_background.alt}
                        width={key_service.primary.card_background.dimensions.width}
                        height={key_service.primary.card_background.dimensions.height}
                    />
                    <h3>{key_service.primary.card_title}</h3>
                       </div>
                      )
                      })
                    }
                </div>
            </section>
            <section className="home_video_section">
                <video autoPlay muted loop id="myVideo">
                    <source src={`${homepage.video.url}`} type="video/mp4"/>
                </video>
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