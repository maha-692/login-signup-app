import React from 'react';
import { Fade } from 'react-awesome-reveal';
import './Homepage.css'; // Ensure this path is correct
import Footer from './Footer';

const Homepage = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        {/* Add any content you want in the hero section here */}
      </header>
      {/* Animated section */}
      <div className="scroll-animation-section">
        <Fade triggerOnce={true} direction="up" duration={1000}>
          <div className="welcome-section">
            <h2>Welcome To ParkPro Solution</h2>
            <p>
              At ParkPro, we simplify your parking experience
              with customized solutions for hospitals, airports, universities, and more.
              We transform parking into a seamless experience. We provide tailored parking solutions designed
              to meet the unique needs of organizations and high-traffic areas. With technology and customer-focused
              services, ParkPro ensures secure, efficient, and hassle-free parking management. Discover how we’re making
              parking easy for organizations and their communities.
            </p>
          </div>
        </Fade> 
    

        <Fade triggerOnce={true} direction="up" delay={500} duration={1000}>
  <div className="why-choose-us-section">
    <h2><t>Why Choose Us</t></h2>
    <ul>
      <li className="why-choose-us-item">
        <span className="bullet-number">1.</span>
        <div className="why-choose-us-content">
          <strong>Exploratory Call:</strong>
          <p>A collaborative conversation to determine your needs and discover how ParkPro’s industry-leading parking operation services and add-ons can enhance your parking property.</p>
        </div>
      </li>
      <li className="why-choose-us-item">
        <span className="bullet-number">2.</span>
        <div className="why-choose-us-content">
          <strong>Customized Proposal:</strong>
          <p>A customized parking concept that tailors ParkPro’s expert parking services and technology solutions to the location, size, and goals of your property.</p>
        </div>
      </li>
      <li className="why-choose-us-item">
        <span className="bullet-number">3.</span>
        <div className="why-choose-us-content">
          <strong>Operational Plan:</strong>
          <p>A detailed look at your new ParkPro operation and how it will increase your asset’s value.</p>
        </div>
      </li>
    </ul>
     </div>
</Fade>

        {/* Secure & Reliable Section */}
        <Fade triggerOnce={true} direction="up" delay={1000} duration={1000}>
          <h2>Secure & Reliable</h2>
          <p>
          Our advanced monitoring systems ensure round-the-clock surveillance, keeping vehicles secure and providing peace of mind for all users.<br/>
With robust, real-time access controls, ParkPro prevents unauthorized entry, offering a safe and efficient environment for all visitors.<br/>
Built on industry-leading technology, our systems detect issues proactively, ensuring the parking environment remains dependable and resilient. <br/>
            We provide state-of-the-art security features to keep your parking areas safe and efficient.
          </p>
        </Fade>
      </div>
      

      {/* Add the Footer component here */}
      <Footer />
      
    </div>
  );
};

export default Homepage;
