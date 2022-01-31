import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import React from "react";
import Image from 'next/image'
import {RichText} from "prismic-reactjs";

export default function Contacts({ data }) {

    return (
        <MainContainer>

        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://sikacci.prismic.io/api/v2", {})
    const data = await client.query(Prismic.Predicates.at('document.type', 'contacts'))
    return {props: {data: data}}
}