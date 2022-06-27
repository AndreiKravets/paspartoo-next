import React from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import {motion} from "framer-motion";
import MainContainer from "../../components/MainContainer";

const SectionTitleDescription = (section) =>  {
    section = section.section
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
    <section className={`services_title_description ${section.primary.individual_class_name != null ? section.primary.individual_class_name : ''}`}>
        <div>
            <div className="row">
                {
                    (section.items.map((card, index) => {
                        return (
                            <motion.div key={index} className={`${card.block} ${card.individual_class_name != null ? card.individual_class_name : ''}`}
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
                                <div className="d-flex services_card_top_block">
                                    <h4><span>.</span>{RichText.render(card.title_block)}</h4>
                                </div>
                                <div className="services_card_content_block">
                                    {RichText.render(card.content_block)}
                                </div>
                            </motion.div>
                        )
                    }))
                }
            </div>
        </div>
    </section>
    )
}

export default SectionTitleDescription