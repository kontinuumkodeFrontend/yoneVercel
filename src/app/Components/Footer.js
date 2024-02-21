import React, { useEffect, useState } from "react";
import { Subscribe } from "./Subscribe";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ModalContainer } from "../features/Modal";
import { PopupContainer } from "../features/Popup";
import { Get_Contact } from "../services/Url";
import { get } from "../services/Service";

export default function Footer({ subscribe }) {
  const [data, setData] = useState();
  const router = useRouter();
  const { pathname, query } = router;

  useEffect(() => { get(Get_Contact, setData) }, [pathname]);
  return (
    <div className={subscribe ? "subscribe" : ""}>
      <PopupContainer />
      <ModalContainer />
      {subscribe ? <Subscribe /> : ""}
      <footer className="footer-sec"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="logo">
                <img src={'/images/logo.png'} alt="logo" />
              </div>
              <div className="footer-detail">
                <p className="text-light footer-description">
                  Connect with us on social media and stay up to <br />
                  date on latest flight & hotel offers, updates
                  <br />
                  about new destinations and much more!!
                </p>
                <ul className="d-flex p-0">
                  <li className="footer-icon">
                    <a href="https://twitter.com/yonetravels?lang=en" target="_blank" rel="noreferrer">
                      <img src={'/images/footer-icon1.png'} alt="img" />
                    </a>
                  </li>
                  <li className="footer-icon">
                    <a href="https://www.instagram.com/yonetravels/" target="_blank" rel="noreferrer">
                      <img src={'/images/footer-icon2.png'} alt="img" />
                    </a>
                  </li>
                  <li className="footer-icon">
                    <a href="https://www.facebook.com/yonetravelsandtours/" target="_blank" rel="noreferrer">
                      <img src={'/images/footer-icon3.png'} alt="img" />
                    </a>
                  </li>
                  <li className="footer-icon">
                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                      <img src={'/images/footer-icon4.png'} alt="img" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="footer-content">
                <p className="remember-description mb-4 text-light h4">
                  Quick Links
                </p>
                <ul className="text-light p-0">
                  <li className="d-flex">
                    <Link href="/" className="text-light" >
                      <img
                        src={'/images/right-arrow.png'}
                        className="footer-right-icon"
                        alt="img"
                      />
                      Home
                    </Link>
                  </li>
                  <li className="d-flex">
                    <Link
                      href="/gallery"
                      className="text-light"
                      
                    >
                      <img
                        src={'/images/right-arrow.png'}
                        className="footer-right-icon"
                        alt="img"
                      />
                      Gallery
                    </Link>
                  </li>
                  <li className="d-flex">
                    <Link href="/about" className="text-light" >
                      <img
                        src={'/images/right-arrow.png'}
                        className="footer-right-icon"
                        alt="img"
                      />
                      About Us
                    </Link>
                  </li>
                  <li className="d-flex">
                    <Link
                      href="/contactus"
                      className="text-light"
                      
                    >
                      <img
                        src={'/images/right-arrow.png'}
                        className="footer-right-icon"
                        alt="img"
                      />
                      Contact Us
                    </Link>
                  </li>
                  <li className="d-flex">
                    <Link
                      href="/termcondition"
                      className="text-light"
                      
                    >
                      <img
                        src={'/images/right-arrow.png'}
                        className="footer-right-icon"
                        alt="img"
                      />
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="d-flex">
                    <Link
                      href="/privacypolicy"
                      className="text-light"
                      
                    >
                      <img
                        src={'/images/right-arrow.png'}
                        className="footer-right-icon"
                        alt="img"
                      />
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="footer-contact">
                <p className="remember-description mb-4 text-light h4">
                  Contact Us
                </p>
                <ul className="p-0">
                  <li className="d-flex">
                    <img src={'/images/footer-location.png'} className="info-icon" alt="img" />
                    <p className="text-light mb-0" style={{ width: '80%' }}>
                      {data?.address}
                    </p>
                  </li>
                  <li className="d-flex">
                    <img
                      src={'/images/footer-telephone.png'}
                      className="info-icon"
                      alt="img"
                    />
                    <a
                      href={`tel:${data?.phone_number}`}
                      className="text-light text-decoration-none"
                      target="_blank"
                      rel="noreferrer"
                    > {data?.phone_number}
                    </a>
                  </li>
                  <li className="d-flex">
                    <img src={'/images/footer-email.png'} className="info-icon" alt="img" />
                    <a href={`mailto:${data?.email}`} className="text-light text-decoration-none">
                      {data?.email}                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="gallery-showcase">
                <p className="remember-description mb-4 text-light h4">
                  Gallery Showcase
                </p>
                <ul className="gallery-image mt-5">
                  <li>
                    <Link href="/gallery">
                      <img src={'/images/gallery1.jpg'} alt="img" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <img src={'/images/gallery2.jpg'} alt="img" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <img src={'/images/gallery3.jpg'} alt="img" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <img src={'/images/gallery4.jpg'} alt="img" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <img src={'/images/gallery5.jpg'} alt="img" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery">
                      <img src={'/images/gallery6.jpg'} alt="img" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p className="footer-description text-center text-light m-0">
              Copyright 2023 . All Rights Reserved by Yone Travels & Tour
            </p>
          </div>
        </div>
      </footer>
      {/* <!-- footer-end --> */}
    </div>
  );
}
