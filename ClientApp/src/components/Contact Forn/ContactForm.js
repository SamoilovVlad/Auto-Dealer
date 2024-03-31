import React, { useState } from 'react';
import { contactFormIcons, socialMediaIcons } from '../StaticData';
import EmailSender from '../Api&Services/EmailSender';
import './ContactForm.css';

const ContactForm = () => {

    const [isNameValid, setIsNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isMessageValid, setIsMessageValid] = useState(true);


    ////Handlers
    const handleFocus = (event) => {
        var parent = event.target.parentNode;
        if (event.target.value.length === 0)
            parent.classList.add('focus');
    }
    const handleBlur = (event) => {
        var parent = event.target.parentNode;
        if (event.target.value.length === 0)
            parent.classList.remove('focus');
    }

    const handlePhoneNumberInput = (event) => {
        const cleanedInput = event.target.value.replace(/[^0-9+]/g, '');
        event.target.value = cleanedInput;
    }

    ////Validation
    const IsEmailValid = (event) => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (event.target.value.match(validRegex))
            setIsEmailValid(true);
        else setIsEmailValid(false)
    }

    const IsNameValid = (event) => {
        const nameLength = event.target.value.length;
        if (nameLength > 1 && nameLength < 16)
            setIsNameValid(true);
        else setIsNameValid(false);
    }

    const IsPhoneNumberValid = (event) => {
        handlePhoneNumberInput(event);
        const validRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
        if (event.target.value.match(validRegex))
            setIsPhoneValid(true);
        else setIsPhoneValid(false);
    }

    const IsMessageValid = (event) => {
        if (document.querySelector('textarea').value.length > 0)
            setIsMessageValid(true)
        else setIsMessageValid(false);
    }

    const IsFormValid = () => {
        let isValid = true;
        document.querySelectorAll('.input').forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                return;
            }
        });
        return isValid && isEmailValid && isMessageValid && isNameValid && isPhoneValid;
    }

    const SendEmail = (event) => {
        event.preventDefault();
        if (IsFormValid()) {
            const message = document.querySelector('textarea').value;
            const name = document.querySelector('#inputName').value;
            const phone = document.querySelector('#inputPhone').value;
            const email = document.querySelector('#inputEmail').value;
            EmailSender.SendEmail(message, name, phone, email);
            document.querySelectorAll('.input').forEach(input => {
                input.value = '';
            })
        }
        else alert('Some of forms still empty or invalid data!!!')
    }

    return (
        <div className='form'>
            <div className='contact-info'>
                <h3 className='contact-title'>Let's get in touch</h3>
                <p className='info-text'>Thank you for reaching out to us! Please fill out the form, and we'll get back to you as soon as possible.</p>
                <div className='info'>
                    {contactFormIcons.map((icon, index) => (
                        <div key={index} className='information'>
                            <img className='icon' src={icon.src} alt='icon' />
                            <p>{icon.text}</p>
                        </div>
                    ))}
                </div>
                <div className='social-media'>
                    <p>Contact with us :</p>
                    <div className='social-media-icons'>
                        {socialMediaIcons.map((socialMedia, index) => (
                            <div key={index} className='social-icon'>
                                <a href={socialMedia.href}>
                                    {socialMedia.icon}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='contact-form'>
                <span className='circle one'></span>
                <span className='circle two'></span>
                <form>
                    <h3 className='contact-title'>Contact us</h3>
                    <div className='input-container'>
                        <input id='inputName' name='name' type='text' className='input' onFocus={handleFocus} onBlur={handleBlur} onInput={IsNameValid}/>
                        <label>Name</label>
                        <span>Name</span>
                    </div>
                    {!isNameValid && <p id='nameError' className='contact-form-error'>Name should have more than 1 symbol and less than 16</p>}
                    <div className='input-container'>
                        <input id='inputEmail' name='email' type='email' className='input' onFocus={handleFocus} onBlur={handleBlur} onInput={IsEmailValid}/>
                        <label>Email</label>
                        <span>Email</span>
                    </div>
                    {!isEmailValid && <p id='emailError' className='contact-form-error'>Invalid email</p>}
                    <div className='input-container'>
                        <input id='inputPhone' name='phone' type='tel' className='input' onFocus={handleFocus} onBlur={handleBlur} onInput={IsPhoneNumberValid}/>
                        <label>Phone</label>
                        <span>Phone</span>
                    </div>
                    {!isPhoneValid && <p id='phoneError' className='contact-form-error'>Invalid phone number +XX...</p>}
                    <div className='input-container textarea'>
                        <textarea name='message' className='input' onFocus={handleFocus} onBlur={handleBlur} onInput={IsMessageValid} />
                        <label>Message</label>
                        <span>Message</span>
                    </div>
                    {!isMessageValid && <p id='messageError' className='contact-form-error' style={{marginBottom:'20px'}}>Add message please</p>}

                    <p id='messageError' className='contact-form-error'></p>
                    <input type='submit' value='Send' className='send-btn' onClick={SendEmail} />
                </form>
            </div>
        </div>
    );
}
export default ContactForm;