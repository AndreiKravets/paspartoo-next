import React from 'react'
import Link from "next/link"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa'
import { FiMapPin, FiMail} from 'react-icons/fi'



export default function Footer () {
    return(
        <footer>
            <div className="container-fluid footer_top_fluid">
                <div className="row">
                    <div className="container">
                        <ul id="menu-social-link" className="footer_social">
                            <li><a href="#"><FaFacebookF/></a></li>
                            <li><a href="#"><FaTwitter/></a></li>
                            <li><a href="#"><FaLinkedinIn/></a></li>
                            <li><a href="#"><FaPinterestP/></a></li>
                        </ul>
                        <img src="footer_logo.svg" alt=""/>
                        <ul id="menu-social-link" className="footer_social">
                            <li><a href="#"><FaFacebookF/></a></li>
                            <li><a href="#"><FaTwitter/></a></li>
                            <li><a href="#"><FaLinkedinIn/></a></li>
                            <li><a href="#"><FaPinterestP/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-fluid footer_block_fluid">
                <div className="row">
            <div className="container footer_block">
                <div className="row">
                    <div className="col-md-4 contacts">
                        <div className="phone">
                            <a href="tel:7029704043" target="_blank">702-970-4043</a>
                        </div>
                         <a href="https://goo.gl/maps/a3i14CZ7G4v" target="_blank"><FiMapPin />18851 NE 29th Ave, Suite 700, Miami, FL 33180</a>
                         <a href="mailto:info@paspartoo.com"><FiMail />info@paspartoo.com</a>
                    </div>
                <div className="col-md-2">
                    <h6>Company</h6>
                    <ul>
                        <li>
                            <Link href="/about">About Us</Link>
                        </li>
                        <li>
                            <Link href="/">Our Team</Link>
                        </li>
                        <li>
                            <Link href="/">Our Works</Link>
                        </li>
                        <li>
                            <Link href="/">Blog</Link>
                        </li>
                        <li>
                            <Link href="/">Contacts</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h6>Digital Marketing</h6>
                    <ul>
                        <li>
                            <Link href="/">Overview</Link>
                        </li>
                        <li>
                            <Link href="/">Pay-Per-Click Marketing</Link>
                        </li>
                        <li>
                            <Link href="/">Search Engine Optimization</Link>
                        </li>
                        <li>
                            <Link href="/">Social Media Marketing</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h6>Web Development</h6>
                        <ul>
                            <li>
                                <Link href="/">Overview</Link>
                            </li>
                            <li>
                                <Link href="/">UX/UI Design Services</Link>
                            </li>
                            <li>
                                <Link href="/">WordPress</Link>
                            </li>
                        </ul>
                    <h6>eCommerce</h6>
                    <ul>
                        <li>
                            <Link href="/">Solutions</Link>
                        </li>
                        <li>
                            <Link href="/">Magento eCommerce development</Link>
                        </li>
                        <li>
                            <Link href="/">Shopify development service</Link>
                        </li>
                        <li>
                            <Link href="/">WooCommerce Development Services</Link>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
                </div>
            </div>
        </footer>
    )
}