import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope  } from "react-icons/fa";
import "./Contact.css"; 

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pf1z46v",   // EmailJS service ID
        "template_gsppbdk",  // EmailJS template ID
        form.current,
        "jH8JvMIGD9ck2mZ0_"    // EmailJS public key
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          form.current.reset();
        },
        () => {
          setStatus("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title"><FaEnvelope className="card-icon" />Contact Me</h2>
      <p className="subtitle">I'm open to opportunities, collaborations, or a friendly hello.</p>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="text" name="phone" placeholder="Phone Number" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default ContactForm;
