import React from "react";

export const Banner = ({ content }) => {
  return (
    <section
      className="bnr-sec bg"
      style={{ backgroundImage: `url('/images/innerPages/Banner.jpg')` }}
    >
      <div className="container">
        <div className="bnr-ctnt" data-aos="fade-up">
          <h1 className="bnr-heading">{content?.heading}</h1>
          <p className="heading-description">
            {content?.description}
          </p>
        </div>
      </div>
    </section>
  );
};
