import React, {Fragment} from 'react'
import SectionWithCards from "./prismic_components/SectionWithCards";
import ServiceContactSection from "./prismic_components/ServiceContactSection";
import ContentAndImage from "./prismic_components/ContentAndImage";
import WeOffer from "./prismic_components/WeOffer";
import BrandsSlider from "./prismic_components/BrandsSlider";

const PrismicBody = (body) => {

    const content = body.content
    const project_slider = body.project_slider
    const project_category = body.project_category
    return (
        <Fragment>
            {content.map((section, index) => {
                if (section.slice_type == 'section_with_cards') {
                    return (
                        <SectionWithCards section={section} index={index} key={index}/>
                        )
                }
                if (section.slice_type == 'service_contact_section') {
                    return (
                        <ServiceContactSection section={section} project_slider={project_slider} project_category={project_category} index={index} key={index}/>
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
                if (section.slice_type == 'brands_slider') {
                    return (
                        <BrandsSlider section={section} index={index} key={index}/>
                        )
                }
            })}
        </Fragment>
    )
}

export default PrismicBody