import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import React from "react";
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import ContactForm from '../components/ContactForm'

export default function Contacts({ data, header_footer }) {
    header_footer = header_footer
    return (
        <MainContainer header_footer={header_footer}>
            <section className="contacts_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 contacts_section_content">
                          <h1 className="h2">
                              Ready to discuss your project?
                          </h1>
                            <h4>Use the form or write us an e-mail: </h4>
                            <a href="mailto:info@paspartoo.com">info@paspartoo.com</a>
                            <a href="tel:+17029704043" className="contacts_tel">+1 702 970 4043</a>
                        </div>
                        <div className="col-lg-7 contacts_section_form">
                            <ContactForm />
                        </div>
                    </div>
                    <div className="row contacts_section_address">
                        <div className="col-12"><div></div></div>
                        <div className="col-sm-4">
                             <h3>United States</h3>
                            <p>18851 NE 29th Ave, Suite 700 <br/> Miami, FL 33180</p>
                        </div>
                        <div className="col-sm-4">
                             <h3>Portugal</h3>
                            <p>Rua dos Anjos 1F <br/>
                                Lisboa, 1150-032</p>
                        </div>
                        <div className="col-sm-4">
                             <h3>Ukraine</h3>
                            <p>Sobornyi Ave, 160 <br/>
                                Zaporizhzhia, Ukraine</p>
                        </div>
                    </div>
                </div>
            </section>

        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://alex-paspartoo.prismic.io/api/v2", {})
    const header_footer = await client.query(Prismic.Predicates.at('document.type', 'header_footer'))
    const data = await client.query(Prismic.Predicates.at('document.type', 'contacts'))
    return {props: {
        header_footer:header_footer,
        data: data
    }}
}