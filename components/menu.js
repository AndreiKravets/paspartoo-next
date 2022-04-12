import React from 'react'
import Link from "next/link"

const Menu = ()=>  {
        return (
            <ul>
                <li>
                    <Link href="/services">Services</Link>
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

export default Menu