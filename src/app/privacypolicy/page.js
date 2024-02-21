"use client";
import React, { useState, useEffect } from "react";
import { post } from "../services/Service";
import { Privacy_Policy } from "../services/Constants";
import { Banner } from "../Components/Banner";
import { Get_CMS } from "../services/Url";

const bnrCtnt = {
  heading: "Privacy Policy",
  link: [
    { name: "Home", link: "/" },
    { name: "Privacy Policy", link: "/privacypolicy" },
  ],
  image: "/images/innerPages/innerBanner.jpg",
};
export default function Privacy() {
  const [data, setData] = useState();

  useEffect(() => {
    const body = JSON.stringify({
      type: Privacy_Policy,
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
              Privacy Policy
            </div>
            <h3 className="sec-inr-heading">Our Policies</h3>
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
