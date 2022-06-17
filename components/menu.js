import React, {useState,useEffect} from 'react'
import Link from "next/link"

export default function Menu (data) {
    console.log(data)
    const services = data.services
    const category = data.services_category
    const sort_services = []
    const sort_category = []
    const [activeSubmenu, setActiveSubmenu] = useState(0);
    services ? services.map((item, index) => {
        sort_services[item.data.order - 1] = item
    }) : '';
    category ? category.map((item, index) => {
        sort_category[item.data.order - 1] = item
    }) : '';

    const [loaded, setLoaded] = useState(true)

    return (
        <>
            <ul>
                <li className="menu_services">
                    <Link href="">Services</Link>
                    <ul className="services_submenu">
                        {
                            (category ? category.map((category)=>{
                            return(
                                <>
                                  {console.log(category)}
                                  <li key={category.id}>{category.data.name}</li>
                                </>
                            )
                          }) :'')
                        }
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
            </>
        )
}