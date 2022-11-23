import React, { useState } from 'react'
import Card from '../../components/card/Card'
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify"
import axios from "axios"
import { BACKEND_URL } from '../../services/authService';
import "./Contact.scss"

const Contact = () => {
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const data = {
        subject,
        message
    }

    const sendEmail = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/contactus`, data)
            setSubject("")
            setMessage("")
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='contact'>
        <h3 className='--mt'>Contact Us</h3>
        <div className="section">
            <form onSubmit={sendEmail}>
                <Card cardClass={"card"}>
                    <label >Subject</label>
                    <input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject"/>
                    
                    <label >Message</label>
                    <textarea name="message" value={message} cols="30" rows="10" placeholder='Message' onChange={(e) => setMessage(e.target.value)} required></textarea>

                    <button className='--btn --btn-primary'>Send message</button>
                </Card>
            </form>

            <div className="details">
                <Card cardClass={"card2"}>
                    <h3>Our Contact Information</h3>
                    <p>Fill the form or contact us via other channels below</p>
                

                <div className="icons">
                    <span>
                        <FaPhoneAlt />
                        <p>+91 1112223334</p>
                    </span>
                    <span>
                        <FaEnvelope />
                        <p>support@pinventory.com</p>
                    </span>
                    <span>
                        <GoLocation />
                        <p>Mumbai</p>
                    </span>
                    <span>
                        <FaTwitter />
                        <p>@pinventory</p>
                    </span>
                </div>
            </Card>
            </div>
        </div>
    </div>
  )
}

export default Contact