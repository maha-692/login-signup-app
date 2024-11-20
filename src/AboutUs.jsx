import React from 'react';
import './AboutUs.css';
import aboutimage from './assets/aboutimage.jpg'; // Make sure this path is correct

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-image-container">
        <img src={aboutimage} alt="About Us" className="about-image" />
      </div>
      <div className="about-description-container">
        <div className="about-description">
          <h1>About Us</h1>
          <p>
            At Park Pro Solutions, we specialize in delivering cutting-edge parking management solutions tailored to meet
            the unique needs of various sectors, including hospitals, universities, airports, and commercial facilities. 
            With a commitment to reliability, innovation, and efficiency, we empower organizations to streamline their 
            parking operations, enhance security, and improve user experiences. Our solutions are designed to be scalable 
            and adaptable, ensuring seamless integration with existing systems while future-proofing your property. Partner 
            with us to transform parking from a challenge into a smooth, managed experience that benefits both your organization 
            and its users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
