import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import Link from "next/link";
import {motion} from "framer-motion";

const WeOffer = (section) =>  {
    section = section.section
    console.log(section)
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <section className= "service_we_offer">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h5>#We Offer</h5>
                        <h3>{section.primary.we_offer_title}</h3>
                    </div>
                    {section.items.map((item, index) => {
                        return(
                            <motion.div key={index} className='col-md-4 col-sm-12'
                                        initial="hidden" whileInView="visible"
                                        viewport={{once: true}} key={index} variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 100
                                },
                                visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: .07 * index,
                                        type: "spring",
                                        bounce: 0.4,
                                        duration: .8
                                    }
                                }
                            }}>
                            <div><h4><span>.</span>{item.we_offer_item_title}</h4></div>
                            <div>{RichText.render(item.we_offer_item_content)}</div>
                            </motion.div>
                        )
                    })
                    }
                </div>
            </div>
        </section>
    )
}

export default WeOffer