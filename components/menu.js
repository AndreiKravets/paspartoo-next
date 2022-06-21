import React, {useState,useEffect} from 'react'
import Link from "next/link"

export default function Menu (data) {
    console.log(data)
    const services = data.services
    const category = data.services_category
    const sort_services = []
    const sort_category = []
    const [activeSubmenu, setActiveSubmenu] = useState('');
    // services ? services.map((item, index) => {
    //     sort_services[item.data.order - 1] = item
    // }) : '';
    category ? category.map((item, index) => {
        sort_category[item.data.order - 1] = item
    }) : '';

    console.log(services)
    const [loaded, setLoaded] = useState(true)
    const myLink = ''
    return (
        <>
            <ul>
                <li className="menu_services">
                    <Link href="">Services</Link>
                    <ul className="services_submenu">
                        {
                            (sort_category?.map((category)=>{
                            return(
                                <>
                                  {console.log(category)}
                                  <li key={category.id}
                                      className={activeSubmenu == category.id ? 'active' : ''} onClick={() => {setActiveSubmenu(category.id)}}
                                  >{category.data.name}
                                    <ul>
                                        {
                                            (services.map((service)=>{
                                                console.log(category)
                                                console.log(service)
                                                return(
                                                    <>
                                                        {service.data.categories[0].category.slug == category.slugs[0] ? <li key={service.id}>
                                                            <Link href={`/services/${category.slugs[0]}/${service.uid}`}>{service.data.name}</Link>
                                                        </li>:''}
                                                    </>
                                                )
                                            }))
                                        }
                                    </ul>
                                  </li>
                                </>
                            )
                          }))
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