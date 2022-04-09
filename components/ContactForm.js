import React, {useState, useEffect} from 'react';
import {useForm, ValidationError} from '@formspree/react';
import {loadGetInitialProps} from "next/dist/shared/lib/utils";


const ContactForm = () => {
    const [state, handleSubmit] = useForm("mrgjpdan");

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameError, setNameError] = useState('Please fill in this field');
    const [emailError, setEmailError] = useState('Please fill in this field');
    const [formValid, setFormValid] = useState(false)
    useEffect(() => {
        if (emailError || nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, nameError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const err = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!err.test(String(e.target.value).toLowerCase())) {
            setEmailError('Incorrect email')
        } else setEmailError('')
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 3) {
            setNameError('Incorrect name')
        } else setNameError('')
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
        }
    }

    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    } else {
        return (
            <form onSubmit={handleSubmit} className="contact_form form" onClick={
                (e => e.stopPropagation()
                )}>

                <div className="field_form">
                    <input value={name} onBlur={blurHandler} onChange={nameHandler} id="name" type="text" name="name" placeholder="Your Name"/>
                    <ValidationError prefix="Name" field="name" errors={state.errors}/>
                    {(nameDirty && nameError) ? <span className="active">{nameError}</span> : <span>{nameError}</span>}
                </div>

                <div className="field_form">
                    <input value={email} onBlur={blurHandler} onChange={emailHandler} id="email" type="email" name="email" placeholder="Your Email"/>
                    <ValidationError prefix="Email" field="email" errors={state.errors}/>
                    {(emailDirty && emailError) ? <span className="active">{emailError}</span> : <span>{emailError}</span>}
                </div>
                <div className="field_form">
                    <input value={email} onBlur={blurHandler} onChange={emailHandler} id="email" type="email" name="email" placeholder="Your Email"/>
                    <ValidationError prefix="Email" field="email" errors={state.errors}/>
                    {(emailDirty && emailError) ? <span className="active">{emailError}</span> : <span>{emailError}</span>}
                </div>

                <div className="field_form">
                    <input id="Phone" type="phone" name="phone" placeholder="Phone"/>
                    <ValidationError prefix="Phone" field="phone" errors={state.errors}/>
                </div>
                <div className="field_form">
                    <input id="Phone" type="phone" name="phone" placeholder="Phone"/>
                    <ValidationError prefix="Phone" field="phone" errors={state.errors}/>
                </div>

                <div className="field_form">
                    <input id="company" type="text" name="company" placeholder="Your Company"/>
                    <ValidationError prefix="Company" field="company" errors={state.errors}/>
                </div>

                <div className="field_form">
                    <textarea id="message" name="message" placeholder="Your Message"/>
                    <ValidationError prefix="Your message" field="message" errors={state.errors}/>
                </div>

                <div className="form_footer" onClick={() => {setNameDirty(true), setEmailDirty(true), console.log('dssds')}}>
                    <button type="submit" disabled={!formValid}>
                        Submit
                    </button>
                </div>
            </form>

        );
    }
}

export default ContactForm