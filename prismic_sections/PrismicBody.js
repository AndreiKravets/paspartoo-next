import React, {Fragment} from 'react'
import SectionTitleDescription from "./prismic_components/SectionTitleDescription";
import ServiceContactSection from "./prismic_components/ServiceContactSection";
import Content from "./prismic_components/Content";
import ImageBlock from "./prismic_components/ImageBlock";
import KeyPoints from "./prismic_components/KeyPoints";
import ImagesSection from "./prismic_components/ImagesSection";

const PrismicBody = (data) => {
    const content = data.content
    const project_slider = data.project_slider
    const project_category = data.project_category
    return (
        <div className='col-sm-9'>
            {content ? content.map((section, index) => {
                if (section.slice_type == 'section_with_cards') {
                    return (
                        <SectionTitleDescription section={section} index={index} key={index}/>
                        )
                }
                if (section.slice_type == 'content_and_image') {
                    return (
                        <Content section={section} index={index} key={index}/>
                        )
                }
                if (section.slice_type == 'we_offer') {
                    return (
                        <ImageBlock section={section} index={index} key={index}/>
                        )
                }
                if (section.slice_type == 'brands_slider') {
                    return (
                        <ImagesSection section={section} index={index} key={index}/>
                        )
                }
                if (section.slice_type == 'price_section') {
                    return (
                        <KeyPoints section={section} index={index} key={index}/>
                        )
                }
            }) : ''}
        </div>
    )
}

export default PrismicBody