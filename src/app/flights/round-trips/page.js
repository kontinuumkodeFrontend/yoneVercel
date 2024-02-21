'use client'
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import { useDispatch } from "react-redux";
import UserContext from "../../context/userContextAPI";
import { modalVisible } from "../../redux/actions/commonAction";
import { MODAL_TYPE } from "../../services/Constants";

export default function RoundTrip() {
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();

  const [data, setData] = useState(false);
  useEffect(() => {
    setData(true)
  }, [])
  
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(modalVisible?.modalOpen(MODAL_TYPE?.LOGIN));
  };

  return (
    <div>
      <section className="roundtrip-sec text-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="banner-content" data-aos="fade-up">
                <h1 className="banner-heading ">
                  Pilgrimaging Beyond Boundaries Exploring
                  <br /> the World with Round Trip Breakouts
                </h1>
               {data && (ctx.isLogin ? (
                    <Link href="/triprequest" className="banner-btn">
                      Make a Booking
                    </Link>
                  ) : (
                    <button
                      className="banner-btn"
                      onClick={loginHandler}
                    >
                      Make a Booking
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="two-col-bx reverse sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <div className="after-heading ps-0">Introduction</div>
                  <h3>
                    Hook: Embark on a seamless voyage of adventure and discovery
                    with round-trip flights!
                  </h3>
                </div>
                <p>
                  Round trips flights are a great way to explore the world. They
                  allow you to visit collective destinations in one trip, and
                  they can be easy than reserving separate one- way tickets. But
                  how do you comprehend which airlines offer even- trip
                  breakouts? And what are some of the stylish destinations for
                  round- trip ?
                </p>
                <p>
                  The answer to these questions is simple you do n’t have to
                  agitate about them. We ’ve been all the exploration for you,
                  and we ’ve collected a list of some of the stylish airlines
                  that offer even- trip breakouts. So sit backward, relax, and
                  let us take administration of everything!
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img h-100">
                <img
                  src={'/images/roundtrip-hook.png'}
                  className="img-fluid mw-100"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="two-col-bx reverse sec-padding highlight">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="two-col-img h-100">
                <img
                  src={'/images/spontaneity.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <h3>
                    Discuss the flexibility of having a fixed return date while
                    still allowing for exploration and spontaneity during the
                    trip.
                  </h3>
                </div>
                <p className="heading-description">
                  Round trip flights for cheap are a great way to save plutocrat
                  and insure that you can get home at the end of your trip.
                  still, they also offer flexibility. However, you can still
                  explore and be robotic during your trip, If you bespeak a
                  round- trip flight with a fixed return date. For case, if you
                  ’re traveling to Europe for two weeks but care to spend one
                  week in Paris and another week in Rome, you could reserve a
                  round- trip flight from New York City to Paris and also
                  another circle- trip flight from Paris to Rome. That would
                  allow you to spend continuance in both metropolises without
                  cherishing to worry about getting back home on time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="efficient-sec">
        <div className="container">
          <div className="efficient-ctnt">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div
                  className="two-col-hdg efficient-detail"
                  data-aos="fade-left"
                >
                  <h3>
                    Briefly explain the concept of round-trip flights and the
                    convenience they offer
                  </h3>
                  <p className="mb-0">
                    Round- trip breakouts are a great distance to travel. They
                    allow you to visit multiple destinations in one trip, and
                    they can be downhill than reserving separate one- way
                    tickets. But how do you know which airlines offer round-
                    trip breakouts? And what are some of the stylish
                    destinations for round- trip trip? The answer to these
                    questions is simple you do n’t have to worry about them. We
                    ’ve done all the exploration for you, and we ’ve collected a
                    list of some of the stylish airlines that offer even- trip
                    breakouts. So sit back, relax, and let us take charge of
                    everything!
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="efficient-img1">
                  <img src={'/images/efficient1.png'} alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="two-col-bx reverse sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <h3>Discovering the Magic of Round Trip Breakouts</h3>
                </div>
                <p>
                  Punctuate the benefits of flights round trip, similar as peace
                  of mind and cost savings.
                  <br />
                  Round- trip breakouts are a great way to save plutocrat and
                  date. They allow you to bespeak your flight in advancement,
                  which means that you do n’t have to worry about consummate-
                  nanosecond price accumulations or vacuity egresses. And
                  because round- trip breakouts are frequently easy than
                  reserving separate one- way gateways, they can be an excellent
                  way to stretch your trip budget.
                  <br />
                  flights round trip also offer calmness of mind. When you
                  bespeak a circle- trip flight, you comprehend that you ’ll be
                  suitable to get home at the end of your trip without any
                  problems. That's particularly important if you ’re traveling
                  with children or senior family members who may have difficulty
                  covering strange airfields.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={'/images/discovering.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="two-col-bx sec-padding solutions">
        <div className="container">
          <div
            className="sec-heading-wpr text-center mb-5"
            data-aos="fade-left"
          >
            <div className="after-heading ps-0">Tips for Chancing</div>
            <h2 className="sec-heading">
              Tips for Chancing the Stylish Deals on Round Trip Breakouts
            </h2>
          </div>
          <div className="test">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="comfort-ctnt" id="costs-length">
                  <img src={'/images/freights.png'} alt="img" />
                  <h4 className="rental-heading mt-0">
                    Provide practical advice on how to score affordable
                    round-trip flight tickets
                  </h4>
                  <p className="rental-description">
                    Use a flight comparison website to find the stylish deals on
                    round trip flights for cheap. These spots allow you to enter
                    your trip dates and destination, and also they ’ll show you
                    all of the available breakouts from different airlines. You
                    can also filter by price or airline preference if you have
                    specific conditions. - Bespeak your tickets as soon as
                    possible. The before you book, the more likely it's that you
                    ’ll get a good deal.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="comfort-ctnt" id="costs-length">
                  <img src={'/images/time.png'} alt="img" />
                  <h4 className="rental-heading mt-0">
                    Discuss strategies for tracking promotions, utilizing reward
                    programs, or booking during off-peak seasons.
                  </h4>
                  <p className="rental-description">
                    Bandy the stylish timing for reserving breakouts to increase
                    the odds of chancing low airfare.
                    <br /> Consider flying into a different airport. still, this
                    can save you plutocrat on your cheap flights round trips, If
                    you ’re willing to drive or take public transportation from
                    one field to another. For case, if you live in New York City
                    and like to visit Miami Beach, it might be easy to pass into
                    Fort Lauderdale than Miami International Airport.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="comfort-ctnt" id="costs-length">
                  <img src={'/images/layovers.png'} alt="img" />
                  <h4 className="rental-heading mt-0">
                    Mention recommended online platforms or tools that help find
                    discounted flight options.
                  </h4>
                  <p className="rental-description">
                    Numerous websites can help you find cheap flights round
                    trips. Some of the most popular include Kayak, Expedia, and
                    Orbitz. These spots allow you to search for breaks by date,
                    destination, and other factors like airline advancement or
                    stopover date. They also offer price cautions so you ’ll
                    comprehend when a flight drops in price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="two-col-bx reverse sec-padding">
        <div className="container">
          <div
            className="sec-heading-wpr text-center mb-5"
            data-aos="fade-left"
          >
            <h2 className="sec-heading">Conclusion</h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="two-col-ctnt d-flex align-items-center h-100">
                <div className="conclusion-ctnt">
                  <p className="conclusion-description">
                    Round trips flights are a great way to save plutocrat on
                    your coming holiday . They can be cheaper than one- way
                    tickets, and they aspire you to fly into one megacity and
                    out of another without cherishing to worry about chancing
                    transport between the two. However, also round- trip
                    breakouts may be the stylish choice for you, If you ’re
                    planning a trip with collective destinations or if you like
                    further inflexibility in your trip plans.
                  </p>
                  <p className="conclusion-description">
                    Still, also around- trip breakouts may be the stylish option
                    for you, If you ’re allowing a trip with multiple
                    destinations or if you like further inflexibility in your
                    trip plans. They can be cheaper than one- way tickets, and
                    they allow you to pass into one megacity and out of another
                    without cherishing to worry about chancing transportation
                    between the two. However, consider reserving round- trip
                    breakouts rather of one- way tickets, If you ’re looking for
                    ways to consecrate plutocrat on your coming holiday .
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img h-100">
                <img
                  src={'/images/conclusion1.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

