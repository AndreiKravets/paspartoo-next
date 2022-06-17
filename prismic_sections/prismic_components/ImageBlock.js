import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import Link from "next/link";
import {motion} from "framer-motion";

const ImageBlock = (section) =>  {
    section = section.section
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <section className= "service_image_section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>{section.primary.image_block_title}</h3>
                    </div>
                    {section.items.map((item, index) => {
                        return(
                            <motion.div key={index} className='col-sm-12'
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
                                <div className='service_image_big'>
                                    <Image
                                        loader={myLoader}
                                        src={item.image_block_big_image.url}
                                        alt={item.image_block_big_image.alt}
                                        width={item.image_block_big_image.dimensions.width}
                                        height={item.image_block_big_image.dimensions.height}
                                    />
                                </div>
                                <div className='service_image_small'>
                                    <Image
                                        loader={myLoader}
                                        src={item.image_block_small_image.url}
                                        alt={item.image_block_small_image.alt}
                                        width={item.image_block_small_image.dimensions.width}
                                        height={item.image_block_small_image.dimensions.height}
                                    />
                                </div>

                            </motion.div>
                        )
                    })
                    }
                </div>
            </div>
        </section>
    )
}

export default ImageBlock