import React from 'react'
import Link from "next/link"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaInstagram, FaBehance, FaSkype, FaFacebookMessenger } from 'react-icons/fa'
import { FiMapPin, FiMail} from 'react-icons/fi'



export default function Footer ({footer}) {
    footer = footer
    return(
        <footer>
            <div className="container-fluid footer_top_fluid">
                <div className="row">
                    <div className="container">
                        <ul className="footer_social">
                            <li><a href="https://www.facebook.com/paspartooteam" target="_blank"><FaFacebookF/></a></li>
                            <li><a href="https://www.instagram.com/paspartooteam/" target="_blank"><FaInstagram/></a></li>
                            <li><a href="https://www.behance.net/Paspartoo" target="_blank"><FaBehance/></a></li>
                            <li><a href="https://www.linkedin.com/company/paspartoo/" target="_blank"><FaLinkedinIn/></a></li>
                        </ul>
                        {footer ? <img src={footer.results[0].data.light_logo.url} alt=""/> :''}
                        <ul className="footer_social">
                            <li><a href="skype:live:34e0b93dbff341b6?chat"><FaSkype/></a></li>
                            <li><a href="https://www.messenger.com/t/paspartooteam"><FaFacebookMessenger/></a></li>
                            <li><a href="https://api.whatsapp.com/send?phone=17029704043"><FaWhatsapp/></a></li>
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
                            <ul className="footer_social_sm">
                                <li><a href="skype:live:34e0b93dbff341b6?chat"><FaSkype/></a></li>
                                <li><a href="https://www.messenger.com/t/paspartooteam"><FaFacebookMessenger/></a></li>
                                <li><a href="https://api.whatsapp.com/send?phone=17029704043"><FaWhatsapp/></a></li>
                            </ul>
                        </div>
                         <a href="https://goo.gl/maps/a3i14CZ7G4v" target="_blank">18851 NE 29th Ave, Suite 700, Miami, FL 33180</a>
                         <a href="mailto:info@paspartoo.com">info@paspartoo.com</a>
                        <ul className="footer_social_sm">
                            <li><a href="https://www.facebook.com/paspartooteam" target="_blank"><FaFacebookF/></a></li>
                            <li><a href="https://www.instagram.com/paspartooteam/" target="_blank"><FaInstagram/></a></li>
                            <li><a href="https://www.behance.net/Paspartoo" target="_blank"><FaBehance/></a></li>
                            <li><a href="https://www.linkedin.com/company/paspartoo/" target="_blank"><FaLinkedinIn/></a></li>
                        </ul>
                        <div className="clutch-widget" data-nofollow="true" data-url="https://widget.clutch.co"
                             data-widget-type="1" data-darkbg="true" data-height="40"
                             data-clutchcompany-id="509185"></div>
                    </div>
                <div className="col-md-2 col-sm-4">
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
                <div className="col-md-3 col-sm-4">
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
                </div>
                <div className="col-md-3 col-sm-4">
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