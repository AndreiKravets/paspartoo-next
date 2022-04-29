import React, {useState} from 'react'
import {RichText} from "prismic-reactjs";
import Slider from "react-slick";
import {AiOutlineCloseSquare} from "react-icons/ai";
import ContactForm from "./ContactForm";


const slider_we_build = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 790,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        }
    ]
}
export default function Header ({our_projects}) {

    our_projects = our_projects
    const [popup, setPopup] = useState(false);

    return(
        <>
            {popup == true ? <div className="popup active" onClick={() => {
                setPopup(false)
            }}>
                <div onClick={() => {setPopup(false)}}  className="product_popup_close"><AiOutlineCloseSquare/></div>
                <ContactForm />
            </div> : <div className="popup"></div>}
        <section className="our_project_build container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="h4">{our_projects.we_build_title}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        {RichText.render(our_projects.we_build_content)}
                        <div className="our_project_build_slider">
                            <Slider {...slider_we_build}>
                                {
                                    (our_projects.clients_logo.map((logo, index) => {
                                        return (
                                            <div key={index}>
                                                <img src={logo.logo.url} />
                                            </div>

                                        )
                                    }))
                                }
                            </Slider>
                        </div>

                    </div>
                    <div className="col-sm-4">
                        <div>
                        <div className="build_count">
                            {our_projects.we_build_count}<span>+</span>
                        </div>
                        <h5>brands have trusted us</h5>
                        </div>
                        <button onClick={() => {
                            setPopup(true)
                        }}>Want to be here?</button>
                    </div>
                </div>
            </div>
        </section>
            </>
    )
}