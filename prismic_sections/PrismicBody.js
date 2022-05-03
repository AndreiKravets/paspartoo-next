import React, {Fragment} from 'react'
import SectionWithCards from "./prismic_components/SectionWithCards";
import ServiceContactSection from "./prismic_components/ServiceContactSection";
import ContentAndImage from "./prismic_components/ContentAndImage";
import WeOffer from "./prismic_components/WeOffer";

const PrismicBody = (body) => {
    body = body.body
    console.log(body)
    return (
        <Fragment>
            {body.map((section, index) => {
                console.log(section.items)
                if (section.slice_type == 'section_with_cards') {
                    return (
                        <SectionWithCards section={section} index={index} key={index}/>
                        )
                }
                if (section.slice_type == 'service_contact_section') {
                    return (
                        <ServiceContactSection section={section} index={index} key={index}/>
                        )
                }
                if (section.slice_type == 'content_and_image') {
                    return (
                        <ContentAndImage section={section} index={index} key={index}/>
                        )
                }
                if (section.slice_type == 'we_offer') {
                    return (
                        <WeOffer section={section} index={index} key={index}/>
                        )
                }
            })}
        </Fragment>
    )
}

export default PrismicBody