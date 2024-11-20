import React from 'react';
import { Fade } from 'react-awesome-reveal';
import './ContactUs.css'; // Ensure this file is in the same folder as ContactUs.js

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <Fade triggerOnce={true} direction="up" delay={500} duration={1000}>
        <h2>Contact Us</h2>
        <p>We would love to hear from you! Please fill out the form below.</p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone No</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              placeholder="Write your message here"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Fade>
    </div>
  );
};

export default ContactUs;
