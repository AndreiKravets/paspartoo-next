import React, {useState,useEffect} from 'react'
import Link from "next/link"
import { useRouter } from "next/router";

export default function Menu (data) {
    const services = data.services
    const category = data.services_category
    const sort_services = services ? services.slice().sort((item1, item2) =>{
        if(item1.data.order > item2.data.order){
            return 1;
        } else if(item1.data.order < item2.data.order){
            return -1;
        }
        return 0;
    }) : [];
    const sort_category = category ? category.slice().sort((item1, item2) =>{
        if(item1.data.order > item2.data.order){
            return 1;
        } else if(item1.data.order < item2.data.order){
            return -1;
        }
        return 0;
    }) : [];
    const [activeSubmenu, setActiveSubmenu] = useState('');

    const router = useRouter();

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
                                            (sort_services.map((service)=>{
                                                return(
                                                    <>
                                                        {service.data.categories[0].category.slug == category.slugs[0] ?
                                                            <li className={router.pathname == `/services/${category.slugs[0]}/${service.uid}` ? "active" : ""} key={service.id}>
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
                <li className={router.pathname == "/about" ? "active" : ""}>
                    <Link href="/about">About Us</Link>
                </li>
                <li className={router.pathname == "/our-projects" ? "active" : ""}>
                    <Link href="/our-projects">Our Projects</Link>
                </li>
                <li className={router.pathname == "/blog" ? "active" : ""}>
                    <Link href="/blog">Blog</Link>
                </li>
                <li className={router.pathname == "/contacts" ? "active" : ""}>
                    <Link href="/contacts">Contacts</Link>
                </li>
            </ul>
            </>
        )
}