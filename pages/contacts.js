import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import React from "react";
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import { useForm, ValidationError } from '@formspree/react';


function ContactForm() {
    const [state, handleSubmit] = useForm("mrgjpdan");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }
    return (
        <form onSubmit={handleSubmit} className="contact_form">
            <input id="name" type="text" name="name" placeholder="Your Name"/>
            <input id="email" type="email" name="email" placeholder="Your Email"/>
            <input id="Phone" type="phone" name="phone" placeholder="Phone"/>
            <ValidationError
                prefix="Phone"
                field="phone"
                errors={state.errors}
            />
            <input
                id="company"
                type="text"
                name="company"
                placeholder="Your Company"
            />
            <ValidationError
                prefix="Company"
                field="company"
                errors={state.errors}
            />
            <textarea
                id="message"
                name="message"
            />
            <ValidationError
                prefix="Your message"
                field="message"
                errors={state.errors}
            />
            <button type="submit" disabled={state.submitting}>
                Submit
            </button>
        </form>
    );
}

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