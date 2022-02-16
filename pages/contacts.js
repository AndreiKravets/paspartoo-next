import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import React from "react";
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import ContactForm from '../components/ContactForm'

export default function Contacts({ data }) {
    return (
        <MainContainer>
            <section>
                <div className="container form_container">
                    <h1>Get in touch</h1>
                    <h5>Let's talk about how to make your business better</h5>
                    <ContactForm />
                </div>
            </section>

        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://sikacci.prismic.io/api/v2", {})
    const data = await client.query(Prismic.Predicates.at('document.type', 'contacts'))
    return {props: {data: data}}
}