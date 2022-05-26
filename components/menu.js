import React, {useState} from 'react'
import Link from "next/link"
import { BsCaretLeft } from "react-icons/bs"

export default function Menu () {
    const [activeSubmenu, setActiveSubmenu] = useState(0);
    return (
            <ul>
                <li className="menu_services">
                    <Link href="">Services</Link>
                    <ul className="services_submenu">
                        <li className={activeSubmenu == 1 ? 'active' : ''} onClick={() => {setActiveSubmenu(1)}}>UX/UI Design <BsCaretLeft />
                        <ul>
                            <li> <Link href="/services">Web Development Overview</Link></li>
                            <li> <Link href="/services">eCommerce Design and Development Solutions</Link></li>
                            <li> <Link href="/services">Landing Pages Development</Link></li>
                        </ul>
                        </li>
                        <li className={activeSubmenu == 2 ? 'active' : ''} onClick={() => {setActiveSubmenu(2)}}>Web Development <BsCaretLeft />
                            <ul>
                                <li> <Link href="/services">Web Development Overview</Link></li>
                                <li> <Link href="/services">eCommerce Design and Development Solutions</Link></li>
                            </ul>
                        </li>
                        <li className={activeSubmenu == 3 ? 'active' : ''} onClick={() => {setActiveSubmenu(3)}}>Magento <BsCaretLeft />
                            <ul>
                                <li> <Link href="/services">Web Development Overview</Link></li>
                                <li> <Link href="/services">eCommerce Design and Development Solutions</Link></li>
                                <li> <Link href="/services">Landing Pages Development</Link></li>
                            </ul></li>
                        <li className={activeSubmenu == 4 ? 'active' : ''} onClick={() => {setActiveSubmenu(4)}}>Shopify <BsCaretLeft />
                            <ul>
                                <li> <Link href="/services">Web Development Overview</Link></li>
                                <li> <Link href="/services">eCommerce Design and Development Solutions</Link></li>
                                <li> <Link href="/services">Landing Pages Development</Link></li>
                            </ul></li>
                        <li className={activeSubmenu == 5 ? 'active' : ''} onClick={() => {setActiveSubmenu(5)}}>WooComerce <BsCaretLeft />
                            <ul>
                                <li> <Link href="/services">Web Development Overview</Link></li>
                                <li> <Link href="/services">eCommerce Design and Development Solutions</Link></li>
                                <li> <Link href="/services">Landing Pages Development</Link></li>
                            </ul></li>
                        <li className={activeSubmenu == 6 ? 'active' : ''} onClick={() => {setActiveSubmenu(6)}}>WordPress <BsCaretLeft />
                            <ul>
                                <li> <Link href="/services">Web Development Overview</Link></li>
                                <li> <Link href="/services">eCommerce Design and Development Solutions</Link></li>
                                <li> <Link href="/services">Landing Pages Development</Link></li>
                            </ul></li>
                    </ul>
                </li>
                <li>
                    <Link href="/about">About Us</Link>
                </li>
                <li>
                    <Link href="/our-projects">Our Projects</Link>
                </li>
                <li>
                    <Link href="/blog">Blog</Link>
                </li>
                <li>
                    <Link href="/contacts">Contacts</Link>
                </li>
            </ul>
        )
}