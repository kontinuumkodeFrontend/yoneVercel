'use client'
import React, { useState, useEffect } from "react";
import { Banner } from "../Components/Banner";
import { post } from "../services/Service";
import { Get_CMS } from "../services/Url";
import { Terms } from "../services/Constants";

const bnrCtnt = {
  heading: "Terms & Conditions",
  link: [
    { name: "Home", link: "/" },
    { name: " Terms & Conditions", link: "/termcondition" },
  ],
  image: '/images/innerPages/innerBanner.jpg',
};
export default function Term() {
  const [data, setData] = useState();

  useEffect(() => {
    const body = JSON.stringify({
      type: Terms,
    });
    post(Get_CMS, body, setData);
  }, []);

  return (
    <div className="privacy-page">
      <Banner content={bnrCtnt} />
      <section className="privacy-ctnt sec-padding">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-left">
            <div className="cursiv-heading after-line center blue">
              Terms & Conditions
            </div>
            <h3 className="sec-inr-heading">
              Please read these terms and conditions carefully
              <br /> before using the website as they contain
              <br /> important information
            </h3>
          </div>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
          {!data?.content && <p className="text-center">Content Loading...</p>}
        </div>
      </section>
    </div>
  );
}
