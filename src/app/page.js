"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import HolidayImageList from "./features/Home/HolidayImageList";
import { Testimonial } from "./features/Home/Testimonial";
import { useDispatch } from "react-redux";
import UserContext from "./context/userContextAPI";
import { modalVisible } from "./redux/actions/commonAction";
import { MODAL_TYPE } from "./services/Constants";
import OfferSlider from "./features/Home/OfferSlider";
import GalleryList from "./features/Home/GalleryList";

export default function Home() {
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();
  const [domLoaded, setDomLoaded] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(modalVisible?.modalOpen(MODAL_TYPE?.LOGIN));
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div>
      <section className="banner-sec text-center text-light">
        <div className="container">
          <div className="banner-content" data-aos="fade-up">
            <h1 className="banner-heading">Explore the world together</h1>
            <p className="heading-description">
              Find awesome flights, hotel, tour, car and packages
            </p>
          </div>
        </div>
      </section>
      <section className="two-col-bx reverse sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <div className="after-heading line airoplain">
                    Welcome To Yone Travel
                  </div>
                  <h3>We Are Best Adventure Tours in Town</h3>
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
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={"/images/adventure.png"}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="imagination-sec">
        <div className="container">
          <div className="heading-wrp text-center">
            <span className="sm-heading1 italic-font after-line center text-light">
              Yone Travel & Tour
            </span>
            <h2 className="sub-heading text-light">
              Go beyond your imagination
            </h2>
          </div>
          <ul className="d-flex justify-content-center text-light">
            <li data-aos="fade-up">
              <a href="" className="text-light">
                <img
                  src={"/images/imagination-icon1.png"}
                  className="imagination-icon"
                  alt="img"
                />
                <br />
                Destinations
              </a>
            </li>
            <li data-aos="fade-up">
              <a href="" className="text-light">
                <img
                  src={"/images/imagination-icon2.png"}
                  className="imagination-icon"
                  alt="img"
                />
                <br />
                Trivia
              </a>
            </li>
            <li data-aos="fade-up">
              <a href="" className="text-light">
                <img
                  src={"/images/imagination-icon3.png"}
                  className="imagination-icon"
                  alt="img"
                />
                <br />
                Travel Advice
              </a>
            </li>
            <li data-aos="fade-up">
              <a href="" className="text-light">
                <img
                  src={"/images/imagination-icon4.png"}
                  className="imagination-icon"
                  alt="img"
                />
                <br />
                Travel Tickets
              </a>
            </li>
            <li data-aos="fade-up">
              <a href="" className="text-light">
                <img
                  src={"/images/imagination-icon5.png"}
                  className="imagination-icon"
                  alt="img"
                />
                <br />
                Yone Travels
              </a>
            </li>
            <li data-aos="fade-up">
              <a href="" className="text-light">
                <img
                  src={"/images/imagination-icon6.png"}
                  className="imagination-icon"
                  alt="img"
                />
                <br />
                Yone Games
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className="travel-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-center">
              <div className="adventure-image">
                <img
                  src={"/images/travel-front.png"}
                  className="common-image"
                  alt="img"
                  data-aos="flip-left"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="heading-wrp">
                <div className="two-col-hdg" data-aos="fade-left">
                  <div className="after-heading line airoplain">
                    Flight Booking
                  </div>
                  <h3>We Create Journeys Worth Taking For The Traveler</h3>
                </div>
                <p className="heading-description">
                  Yone Travels & Tours Limited (YTTL) is a dynamic tour operator
                  and travel management company with over 20 years experience,
                  committed to offering travel services of the highest quality
                  standards. Established in 1994 as a licensed IATA agent, we
                  specialize in providing a comprehensive travel management
                  service combining our expertise to create a tailor-made
                  solution for each of our client.
                </p>

                <p className="heading-description">
                  Founded by Mrs H.O. Ogunye whose wealth of experience in the
                  travel industry, combined with her innovative and forward
                  thinking skills has been of tremendous value to our phenomenal
                  growth and development.
                </p>
                {/* <button className="btn-design mt-xl-4 mt-3">
                    <span>Book Now</span>
                  </button> */}
                {domLoaded &&
                  (ctx.isLogin ? (
                    <Link href={"/triprequest"} className="btn-design">
                      Book Now
                    </Link>
                  ) : (
                    <button
                      className="btn-design mt-xl-4 mt-3"
                      onClick={loginHandler}
                    >
                      Book Now
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="two-col-bx reverse sec-padding-bottom-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <div className="after-heading line airoplain">
                    Hotel Booking
                  </div>
                  <h3>Enjoy Your Stay</h3>
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
                {domLoaded &&
                  (ctx.isLogin ? (
                    <Link href={"/triprequest"} className="btn-design">
                      Book Now
                    </Link>
                  ) : (
                    <button
                      className="btn-design mt-xl-4 mt-3"
                      onClick={loginHandler}
                    >
                      Book Now
                    </button>
                  ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={"/images/innerPages/hotelBooking.png"}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="activities-sec sec-padding-bottom-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-center">
              <div className="adventure-image mb-lg-0 mb-4">
                <img
                  src={"/images/activities-front.png"}
                  className="common-image"
                  alt="img"
                  data-aos="flip-left"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="heading-wrp">
                <div className="two-col-hdg" data-aos="fade-left">
                  <div className="after-heading line airoplain">
                    Activities Booking
                  </div>
                  <h3> We Create Journeys Worth Taking For The Traveler</h3>
                </div>
                <p className="heading-description">
                  Yone Travels & Tours Limited (YTTL) is a dynamic tour operator
                  and travel management company with over 20 years experience,
                  committed to offering travel services of the highest quality
                  standards. Established in 1994 as a licensed IATA agent, we
                  specialize in providing a comprehensive travel management
                  service combining our expertise to create a tailor-made
                  solution for each of our client.
                </p>

                <p className="heading-description">
                  Founded by Mrs H.O. Ogunye whose wealth of experience in the
                  travel industry, combined with her innovative and forward
                  thinking skills has been of tremendous value to our phenomenal
                  growth and development.
                </p>
                {domLoaded &&
                  (ctx.isLogin ? (
                    <Link href={"/triprequest"} className="btn-design">
                      Book Now
                    </Link>
                  ) : (
                    <button
                      className="btn-design mt-xl-4 mt-3"
                      onClick={loginHandler}
                    >
                      Book Now
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="two-col-bx reverse sec-padding-bottom-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <div className="after-heading line airoplain">
                    Taxi Booking
                  </div>
                  <h3>Reliable and Safe Transportation Services</h3>
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
                {domLoaded &&
                  (ctx.isLogin ? (
                    <Link href={"/triprequest"} className="btn-design">
                      Book Now
                    </Link>
                  ) : (
                    <button
                      className="btn-design mt-xl-4 mt-3"
                      onClick={loginHandler}
                    >
                      Book Now
                    </button>
                  ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={"/images/innerPages/taxi.png"}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="choose-sec">
        <div className="container">
          <div className="heading-wrp text-center">
            <span
              className="sm-heading italic-font after-line center text-light ms-0"
              data-aos="fade-left"
            >
              Why Choose Us
            </span>
            <h2 className="sub-heading text-light">
              Explore The World With Us
            </h2>
            <p className="heading-description text-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
              <br />
              ut labore et dolore magna aliqua.
            </p>
          </div>
          <ul className="choose-sec-list">
            <li data-aos="zoom-in">
              <img src={"/images/choose-icon1.png"} alt="img" />
              <div className="choose-sub-head">Experienced</div>
              <p className="choose-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </li>
            <li data-aos="zoom-in">
              <img src={"/images/choose-icon2.png"} alt="img" />
              <div className="choose-sub-head">Affordable Price</div>
              <p className="choose-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </li>
            <li data-aos="zoom-in">
              <img src={"/images/choose-icon3.png"} alt="img" />
              <div className="choose-sub-head">24/7 Support</div>
              <p className="choose-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/*  Gallery */}
      <GalleryList />

      {/*Offer list*/}
      <section className="offer-sec">
        <div className="container">
          <div className="container">
            <OfferSlider />
          </div>
        </div>
      </section>

      {/*Holiday*/}
      <section className="destination-sec sec-padding-bottom">
        <div className="container">
          <div className="sec-heading-wpr text-center mb-5">
            <div className="cursiv-heading after-line center blue">
              Holiday Packages
            </div>
            <h2 className="sec-heading">Go beyond your imagination</h2>
          </div>
          <div className="dest-gallery">
            <HolidayImageList />
            <div className="btn-wpr d-flex justify-content-center">
              {domLoaded &&
                (ctx.isLogin ? (
                  <Link href={"/holiday"} className="btn-design">
                    Contact Us
                  </Link>
                ) : (
                  <button className="btn-design" onClick={loginHandler}>
                    Contact Us
                  </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="remember-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12"></div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="remember-content" data-aos="fade-right">
                <h2 className="remember-heading mb-3">
                  ARE YOU READY TO TRAVEL? REMEMBER US !!
                </h2>
                <p className="remember-description mb-4">
                  SaJoin the mailing list to receive occasional updates about
                  new destinations , flight & hotel offers and much more!ve Time
                  And Save Money!
                </p>
                {domLoaded &&
                  (ctx.isLogin ? (
                    <Link href={"/contactus"} className="btn-design mb-lg-4">
                      Contact Us
                    </Link>
                  ) : (
                    <button
                      className="btn-design mb-lg-4"
                      onClick={loginHandler}
                    >
                      Contact Us
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonial />
    </div>
  );
}
