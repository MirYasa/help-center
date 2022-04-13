import React from 'react'
import './index.scss'

export default function ContactForm() {

    return <form method="post" data-netlify="true" name="contact" netlify-honeypot="bot-field" className="f c">
        <label htmlFor="name">Name</label>
        <input className="m-b-1" id="name" type="text" required placeholder="e.g. Simon"></input>
        <label htmlFor="email">Email</label>
        <input className="m-b-1" id="email" type="email" required></input>
        <label htmlFor="message">Message</label>
        <textarea id="message" required></textarea>
        <button type="submit" className="btn b primary m-t-2">Send</button>
    </form>
}