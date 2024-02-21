'use client'
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import { useDispatch } from "react-redux";
import UserContext from "../../context/userContextAPI";
import { modalVisible } from "../../redux/actions/commonAction";
import { MODAL_TYPE } from "../../services/Constants";

export default function OneWayFlight() {
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
      <section className="onewayflight-sec text-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="banner-content" data-aos="fade-up">
                <h1 className="banner-heading ">
                  Learning the Art of Buying Low Airfare
                  <br /> Tickets Online
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
                  <div className="after-heading ps-0">Preface</div>
                  <h3>
                    Compactly explain the significance of chancing cheap
                    breakouts and the benefits of buying tickets online.
                  </h3>
                </div>
                <p>
                  The first step to chancing flights cheap breakouts is to know
                  where to look. numerous websites offer low airfare tickets,
                  but not all of them are created equal. Some spots will show
                  you the smallest prices available on a given day, while others
                  may only display prices from certain airlines or trip
                  agencies.
                </p>
                <p>
                  The stylish way to find cheap breakouts is to use a
                  combination of websites. That will give you the most options
                  and allow you to compare prices from different airlines and
                  trip agencies. The first step in this process is to produce a
                  list of all the websites that offer low airfare tickets.
                </p>
                <p>
                  Once you have a list of websites, you can start to compare
                  prices. That will give you an idea of how much you should
                  anticipate to pay for your flight. The coming step is to look
                  at the different airlines and trip agencies that offer low
                  flight discounted airfare tickets. You may find that some
                  companies are more precious than others, so it’s important to
                  keep this in mind when making your decision.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img h-100">
                <img
                  src={'/images/breakout.png'}
                  className="img-fluid"
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
                  src={'/images/anthology.png'}
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
                    Hook the anthology with a compelling statistic or particular
                    yarn about saving plutocrat on airfare.
                  </h3>
                </div>
                <p className="heading-description">
                  The coming step is to visit each of these websites and produce
                  an account. That will allow you to save your hunt preferences
                  and admit dispatch cautions when new breakouts come available.
                  Once you have made arrangements on all the spots, it’s time to
                  start searching for cheap breakouts!
                </p>

                <p className="heading-description">
                  The first thing you should do is search for breakouts to your
                  destination. That will give you an idea of what the average
                  flights cheap is and how important you can anticipate to pay.
                  Once you have an idea of what breakouts are available, it’s
                  time to start looking for deals!
                </p>
                <p>
                  The stylish way to do this is by using the hunt pollutants on
                  each point. For illustration, you can filter by price range or
                  departure date. You can also sort your results by low fares
                  airline tickets , duration, or number of stops. Once you have
                  set up a flight that meets your criteria, click on it to see
                  further details and book it!
                </p>
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
                  <h3>Do Your exploration and Compare Prices</h3>
                </div>
                <p>
                  Share tips on how to conduct thorough exploration using flight
                  hunt machines and comparison websites. You can save a lot of
                  plutocrat by doing your exploration and comparing prices
                  before you flight discounted your flight. numerous websites
                  allow you to search for breakouts, compare prices from
                  different airlines, and indeed book directly through them.
                  Some of the most popular include Expedia, Kayak, Orbitz, and
                  Priceline.
                </p>
                <p>
                  You can also use Google Breakouts to search for breakouts and
                  compare discount airlines ticket. The website is easy to use
                  and allows you to filter your solutions by airline, price
                  range, departure time, and better. You can indeed set up
                  cautions so that you ’ll be notified when the price of a
                  flight drops below a certain quantum.
                </p>
                <p>
                  Punctuate the significance of checking prices across multiple
                  platforms to find the stylish deals. It’s important to low
                  fares airline tickets prices across multiple platforms to find
                  the swish deals. Some websites may have nether prices than
                  others, so it’s worth taking the time to equate them all
                  before making a decisiveness. You can also use Google
                  breakouts to search for breakouts and equate prices. The
                  website is easy to use and allows you to clear your results by
                  airline, price range, departure time, and better.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={'/images/exploration.png'}
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
          <div className="test">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="comfort-ctnt" id="costs-length">
                  <img src={'/images/freights.png'} alt="img" />
                  <h4 className="rental-heading mt-0">
                    Check for retired freights and fresh Costs
                  </h4>
                  <p className="rental-description">
                    Warn compendiums about retired freights and fresh costs that
                    may be added during the booking process.
                    <br /> That can include effects like baggage freights, seat
                    selection charges, and levies. You can also suggest that
                    your compendiums consider reserving a best uk flight deals
                    with a layover. That's when you have to change aeroplanes in
                    another megacity before continuing to your final
                    destination. It’s frequently cheaper than reserving two
                    separate breakouts, but it does add time to your trip. give
                    tips on how to navigate stopovers efficiently and make the
                    utmost of layover destinations.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="comfort-ctnt" id="costs-length">
                  <img src={'/images/time.png'} alt="img" />
                  <h4 className="rental-heading mt-0">
                    Book at the Right Time
                  </h4>
                  <p className="rental-description">
                    Bandy the stylish timing for reserving breakouts to increase
                    the odds of chancing low airfare.
                    <br /> You can also give tips on how to save plutocrat on
                    breakouts by reserving with a low airfare tickets. These
                    carriers frequently offer lower fares than their full-
                    service counterparts, but they may charge redundant for
                    effects like checked baggage and in- flight refections. You
                    could suggest that your compendiums consider flying out of
                    an field that’s further down from home than the bone they
                    generally use. That could help them save plutocrat on
                    parking or transportation costs.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="comfort-ctnt" id="costs-length">
                  <img src={'/images/layovers.png'} alt="img" />
                  <h4 className="rental-heading mt-0">
                    Consider Alternate Routes and Layovers
                  </h4>
                  <p className="rental-description">
                    I suggest considering exploring indispensable routes and
                    considering breakouts with stopovers to save plutocrat.
                    <br />
                    You can also suggest that your compendiums consider
                    reserving a discount airlines ticket with a layover. That's
                    when you have to change aeroplanes in another megacity
                    before continuing to your final destination. It’s frequently
                    cheaper than reserving two separate breakouts, but it does
                    add time to your trip.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="two-col-bx reverse sec-padding highlight">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={'/images/elastic.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <h3>Be Elastic with Dates and Destinations</h3>
                </div>
                <p className="heading-description">
                  <b>
                    Explain how being flexible with trip dates and destinations
                    can affect in significant cost savings.
                  </b>
                  <br />
                  Being flexible with trip dates and destinations can affect in
                  significant cost savings. For illustration, if you ’re
                  planning a trip to Europe and want to fly out of New York
                  City, it may be low airfare tickets to fly into London rather
                  of Paris. also, if you ’re going on holiday during peak
                  season( similar as summer), consider reserving your flight for
                  a weekday rather than a weekend. That can save you hundreds of
                  bones on airfare. However, consider using a trip website that
                  allows you to search for breakouts grounded on your budget and
                  preferences, If you ’re not sure where to go. For
                  illustration, if you want to visit Europe but do n’t have a
                  specific destination in mind, use Kayak’s Explore point to
                  find out which metropolises are low cost direct flights during
                  certain times of time.
                </p>
                <p className="heading-description">
                  <b>
                    Give strategies for using flexible date hunt features and
                    exploring near airfields.
                  </b>
                  <br />
                  still, consider using an malleable date hunt point on a trip
                  website, If you ’re flexible with your trip dates. That allows
                  you to search for breakouts within a certain range of dates
                  rather than just one specific day. For illustration, if you
                  want to fly from New York City to Paris in June but do n’t
                  have a particular date in mind, use best uk flight deals to
                  hunt point to see which days are cheapest.
                </p>
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
                  <h3>Take Advantage of Deals and Abatements</h3>
                </div>
                <p>
                  Introduce compendiums to colorful deal websites, newsletters,
                  and social media accounts that offer blinked airfare.
                </p>
                <p>
                  These spots are a great way to find plane tickets deals,
                  especially if you ’re looking for last- nanosecond deals. You
                  can also use them to get cautions on new deals and elevations.
                  For illustration, if you subscribe up for the Kayak
                  newsletter, they ’ll shoot you an dispatch every week with
                  their top 10 flight deals.Bandy the benefits of subscribing up
                  for airline fidelity programs and newsletters to admit
                  exclusive offers.
                </p>
                <p>
                  You can also talk about the benefits of using a trip for
                  discount flight UK to bespeak your breakouts. trip agents have
                  access to special deals and abatements that aren't available
                  to the general public. They can help you find the stylish
                  prices on airfare, hospices, auto settlements, and more.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={'/images/abatements.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="oneway-sec">
        <div className="container">
          <div className="two-col-ctnt text-center oneway-ctnt">
            <div className="two-col-hdg text-light" data-aos="fade-left">
              <h3>Optimize Your Hunt Pollutants</h3>
            </div>
            <p className="heading-description text-light my-4">
              Guide compendiums on how to make the utmost of hunt pollutants to
              narrow down their options and find the stylish prices.
              <br />
              That can be a great way to save planes tickets cheap on breakouts,
              especially if you ’re traveling during peak trip times. For
              example, if you want to fly from New York City to Paris in June
              but befall n’t have a specific date in recollection, use Kayak’s
              flexible date quest point to see which days are cheapest. Optimize
              Your Hunt Filters Guide compendiums on how to make the utmost of
              hunt pollutants to narrow down their options and find the stylish
              prices.
            </p>
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
              <div className="two-col-ctnt">
                <div className="conclusion-ctnt">
                  <p className="conclusion-description">
                    Epitomize the crucial points covered- You can help your
                    compendiums save plutocrat on breakouts by furnishing them
                    with tips on how to find low plane tickets deals. You could
                    also suggest that they consider flying out of an field
                    that’s further down from home than the bone they generally
                    use. That could help them save plutocrat on parking or
                    transportation costs.
                  </p>
                  <p>The further they know about how to find low airfare, the better off they ’ll be. However, please partake them in the commentary below!</p>
                  <h4 className="conclusion-heading">
                    Peace of mind while traveling in an unfamiliar city or
                    country
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img h-100">
                <img
                  src={'/images/conclusion2.png'}
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

