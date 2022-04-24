import React, {useState} from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaPhoneAlt } from 'react-icons/fa'
import { AiOutlineCloseSquare } from "react-icons/ai";
import Menu from "./menu";
import Link from "next/link"
import ContactForm from "./ContactForm";


const Header = ({header})=> {

    header = header
    console.log(header)
    const [activeMenu, setActiveMenu] = useState(false)
    const [activeStickyMenu, setActiveStickyMenu] = useState(false)
    const [popup, setPopup] = useState(false);

    const menuScroll = () => {
        if(window.scrollY > 90){
            setActiveStickyMenu(true)
        }
        else {
            setActiveStickyMenu(false)
        }
    };
    if (process.browser) {
        window.addEventListener('scroll', menuScroll);
    }
    return(
        <>
            {popup == true ? <div className="popup active" onClick={() => {
                setPopup(false)
            }}>
                <div onClick={() => {setPopup(false)}}  className="product_popup_close"><AiOutlineCloseSquare/></div>
                <ContactForm />
            </div> : <div className="popup"></div>}
    <header>
        <div className="header_fluid">
            <div className="container-fluid">
                <div className="row head_menu">
                    <button id="hamb_button"
                            className={activeMenu ? "hamburger hamburger--collapse is-active" : "hamburger hamburger--collapse"}
                            onClick={() => {
                                setActiveMenu(!activeMenu);
                            }}
                            type="button"><span className="hamburger-box"><span
                             className="hamburger-inner"></span></span></button>
                    <div className="col-auto header_logo">
                        {header ? <Link href="/"><a><img src={header.results[0].data.dark_logo.url} alt=""/></a></Link> : ''}
                    </div>
                    <div className="col head_menu_col">
                        <div className="menu-menu-container">
                           <Menu/>
                        </div>
                    </div>
                    <div className="col-auto header_btn">
                        <a href="tel:7029704043"><span><FaPhoneAlt /></span> 702-970-4043</a>
                            <button className="quote app_form" onClick={() => {
                                setPopup(true)
                            }}>Get a Quote</button>
                    </div>
                </div>
            </div>

            <div
                className={activeMenu ? "mobile_menu mobile_menu_top active" : "mobile_menu mobile_menu_top"}>
                <div className="menu_mobile">
                    <Menu/>
                    <div className="mob_menu_social">
                        <ul id="menu-social-link" className="footer_social">
                            <li><a href="#"><FaFacebookF/></a></li>
                            <li><a href="#"><FaTwitter/></a></li>
                            <li><a href="#"><FaLinkedinIn/></a></li>
                            <li><a href="#"><FaPinterestP/></a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>


        <div className={activeStickyMenu ? "fixed-bar animated-quick fadeInDown header_fluid" : "fixed-bar animated-quick fadeOutUp header_fluid"}>
            <div className="container-fluid">
                <div className="row head_menu valign-wrapper">
                    <div className="col-auto header_logo">
                        {header ? <img src={header.results[0].data.light_logo.url} alt=""/> : ''}
                    </div>
                    <div className="col head_menu_col">
                        <div className="menu-menu-container">
                            <Menu/>
                        </div>
                    </div>
                    <div className="col-auto header_btn">
                       <a href="tel:7029704043">702-970-4043</a>
                        <button className="quote app_form">Get a Quote</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
            </>
    )
}
export default Header