import React from 'react'
import Link from "next/link"

const Menu = ()=>  {
        return (
            <ul>
                <li>
                    <Link href="/about">About Us</Link>
                </li>
                <li>
                    <Link href="/works">Our Works</Link>
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