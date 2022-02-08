import React, {Fragment} from 'react'
import SectionWithCards from "./prismic_components/SectionWithCards";
import ServiceContactSection from "./prismic_components/ServiceContactSection";

const PrismicBody = (body) => {
    body = body.body
    return (
        <Fragment>
            {body.map((section, index) => {
                console.log(section.items)
                if (section.slice_type == 'section_with_cards') {
                    return (<SectionWithCards section={section} index={index}/>)
                }
                if (section.slice_type == 'service_contact_section') {
                    return (<ServiceContactSection section={section} index={index}/>)
                }
            })}
        </Fragment>
    )
}

export default PrismicBody