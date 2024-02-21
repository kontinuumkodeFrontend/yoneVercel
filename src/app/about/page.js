import React from "react";
import { Banner } from "../Components/Banner";


export default function About() {
  const bnrCtnt = {
    heading: "About Us",
    image: '/images/innerPages/innerBanner.jpg',
    description: 'We specialize in providing a comprehensive travel management service',
  };
  return (
    <div className="chat-page">
      <Banner content={bnrCtnt} />

      {/* about sec*/}
      <section className="two-col-bx sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <div className="after-heading line airoplain">About Us</div>
                  <h3>Welcome To Yone Travel</h3>
                </div>
                <p>
                  Yone Travels & Tours Limited (YTTL) is a dynamic tour operator
                  and travel management company with over 20 years experience,
                  committed to offering travel services of the highest quality
                  standards. Established in 1994 as a licensed IATA agent, we
                  specialize in providing a comprehensive travel management
                  service combining our expertise to create a tailor-made
                  solution for each of our client.
                </p>
                <p>
                  Founded by Mrs H.O. Ogunye whose wealth of experience in the
                  travel industry, combined with her innovative and forward
                  thinking skills has been of tremendous value to our phenomenal
                  growth and development.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="two-col-img ">
                <img
                  src={'/images/innerPages/about-img.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="zoom-in"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission cards */}
      <section className="misson-sec sec-padding-bottom pt-sm-5 ">
        <div className="container">
          <div className="mission-card-wpr" data-aos="fade-up">
            <div className="mission-card">
              <div className="mission-img">
                <img src={'/images/innerPages/mission.png'} className="img-fluid" alt="mission3" />
              </div>
              <div className="mission-ctnt">
                <h4>Our Mission</h4>
                <p>
                  Providing bespoke travel experience and the highest level of
                  service delivery.
                </p>
              </div>
            </div>
            <div className="mission-card">
              <div className="mission-img">
                <img src={'/images/innerPages/mission2.png'} className="img-fluid" alt="mission3" />
              </div>
              <div className="mission-ctnt">
                <h4>Our Vision</h4>
                <p>
                  We aim to provide our clients with memories/experiences of a
                  lifetime through the travels.
                </p>
              </div>
            </div>
            <div className="mission-card">
              <div className="mission-img">
                <img src={'/images/innerPages/mission3.png'} className="img-fluid" alt="mission3" />
              </div>
              <div className="mission-ctnt">
                <h4>Our Principles</h4>
                <p>
                  We are goal oriented and focused on achieving increased
                  savings and efficiency for our clientele
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
