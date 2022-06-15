import React, {useState} from 'react'
import Image from 'next/image'
import {RichText} from "prismic-reactjs";
import {AiOutlineCloseSquare} from "react-icons/ai";
import ContactForm from "../../components/ContactForm";

const KeyPoints = (section) =>  {
    section = section.section
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    const [popup, setPopup] = useState(false);

    return (
        <>
            {popup == true ? <div className="popup active" onClick={() => {
                setPopup(false)
            }}>
                <div onClick={() => {setPopup(false)}}  className="product_popup_close"><AiOutlineCloseSquare/></div>
                <ContactForm />
            </div> : <div className="popup"></div>}
        <section className={`key_points_section ${section.primary.individual_class_name != null ? section.primary.individual_class_name : ''}`}>
            <div className="container">
                <div className="row">
                    {section.items.map((card, index) => {
                        return(
                            <div key={index} className="col-sm-4">
                                <div className='card_inner'>
                                    <div className="card_title_content">
                                        <h4>{card.title}</h4>
                                    </div>
                                    <div className="card_content">
                                        <p>Starts from</p>
                                    <h3>{card.price}</h3>
                                        <h6>Key Points:</h6>
                                        {RichText.render(card.key_points)}
                                        <button className="key_points_btn" onClick={() => {
                                            setPopup(true)
                                        }}>Get a Quote</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
            </>
    )
}

export default KeyPoints