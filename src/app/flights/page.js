'use client'
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import UserContext from "../context/userContextAPI";
import { modalVisible } from "../redux/actions/commonAction";
import { MODAL_TYPE } from "../services/Constants";


export default function Flights() {
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
      <section className="solotrip-sec text-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="banner-content" data-aos="fade-up">
                <h1 className="banner-heading ">
                  The Art of compassing Solo Adventures Exploring
                  <br /> the World with One-distance flights
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
                  <div className="after-heading ps-0">Prolusion</div>
                  <h3>The world is a big place</h3>
                </div>
                <p>
                  The world is a big place, and there are so multitudinous
                  astounding goods to see and do. But sometimes it can be hard
                  to find the time or capitalist for a caught trip. That’s why I
                  love traveling solo with one- way flights they ’re cheap,
                  flexible, and allow me to explore new chapters at my own pace.
                  one way flights are a great way to travel because they ’re
                  cheap and flexible and allow you to explore new places at your
                  own pace. They ’re also a great way to conceive further of the
                  world without surfacing the bank. One- way flights are all
                  right what they sound like flights that take you from one
                  place to another without returning home
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img h-100">
                <img
                  src={'/images/prolusion.png'}
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
                  src={'/images/one-distance.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <h3>The Freedom of One- distance flights</h3>
                </div>
                <p className="heading-description">
                  Emphasize the intellection of liberation and endless
                  possibilities that one- way flights offer. One- way flights
                  are a great way to travel because they ’re cheap, flexible,
                  and allow you to explore new places at your own pace. They ’re
                  also a great lead to see further of the world without breaking
                  the bank. one way air ticket are all right what they sound
                  like flights that claim you from one place to another without
                  returning home. The Freedom of One- Way flights Emphasizes the
                  sense of liberation and endless possibilities that one- way
                  flights offer
                </p>

                <Accordion className="onedistance-accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="acc-heading">
                      Agitate the freedom to adeptness a individualized trip
                      diary without brassbound return dates.
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="onedistance-accordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className="acc-heading">
                      Accentuate the advantages of compassing lightheartedness
                      and breathing in the moment
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      One- way flights can be a great lead to see further of the
                      light-year without breaking the bank. One- way flights are
                      exactly what they sound like flights that take you from
                      one place to another without regressing home. The Freedom
                      of one way flight London sense of liberation and endless
                      contingences that one- way flights sacrifice. bandy the
                      freedom to craft a individualized trip diary without
                      brassbound return dates. Talk about how one- way flights
                      allow you to probe new places at your own pace without
                      feeling rushed or pressured. illuminate the assets of
                      embracing lightheartedness and living in the moment.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gallery-sec sec-padding solutions">
        <div className="container">
          <div
            className="sec-heading-wpr text-center mb-5"
            data-aos="fade-left"
          >
            <div className="cursiv-heading center blue mb-3">Creative Ways</div>
            <h2 className="sec-heading">Creative Ways to aim Your Diary</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="rental-car">
                <div className="rentcar-img">
                  <img src={'/images/creative-way.png'} className="img-fluid" alt="img" />
                </div>
                <h4 className="rental-heading">
                  Encourage compendiums to allow outside the box and produce
                  extraordinary trip gests
                </h4>
                <p className="rental-description">
                  You can give tips on how to plan a trip that is further than
                  just a vacation. For illustration, you might bounce that
                  albums consider volunteering abroad or taking partition in an
                  adventure sport while they ’re on their trip. You could again
                  bat the benefits of associating with buddies or family members
                  and assay advice on how to make it be
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="rental-car">
                <div className="rentcar-img">
                  <img src={'/images/creative-way.png'} className="img-fluid" alt="img" />
                </div>
                <h4 className="rental-heading">
                  Present ideas for connecting destinations grounded on
                  particular interests or themes
                </h4>
                <p className="rental-description">
                  For illustration, you advance that compendiums plan a one way
                  flight UK around their favorite hobbyhorse or sport. You might
                  also conduct tips on how to find new events and festivals in
                  each destination and encourage albums to accompany them while
                  they ’re there
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="rental-car">
                <div className="rentcar-img">
                  <img src={'/images/creative-way.png'} className="img-fluid" alt="img" />
                </div>
                <h4 className="rental-heading">
                  Suggest effective approaches for making improvisational
                  opinions while traveling
                </h4>
                <p className="rental-description">
                  You could also offer advice on how to close the ultimate of a
                  trip by being elastic and open to new exploits. For
                  illustration, you bounce that albums take advantage of last-
                  minute deals or trip during off- peak times when bounties are
                  nether
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
                  <h3>Inspiring Stories of One- Way trippers</h3>
                </div>
                <p>
                  Share witching stories or interviews with individualities who
                  embarked on memorable pe regrinations with Cheap one way
                  flight London.
                </p>
                <p>
                  Talk about how these travelers were suitable to substantiation
                  the world in a way that they no way could have with return
                  flights. illuminate the sense of adventure and discovery that
                  comes from exploring new places without any preconceived
                  sundries or prospects.
                </p>
                <p>
                  Illuminate the transformative exploits they encountered and
                  how they enhanced their perspective on life. The stories of
                  one- way travelers can be inspiring and eye- opening. They
                  show us that it’s possible to live in the moment, grasp
                  lightheartedness, and experience life to its fullest without
                  any regrets or worries about what might be coming.
                </p>
                <p>
                  Show the particular growth and tone- discovery that can be
                  achieved through solo adventures. illuminate the sense of
                  freedom and independence that comes from traveling alone.
                  illuminate the transformative exploits they encountered and
                  how they enhanced their perspective on life. The stories of
                  one way flights can be inspiring and eye- opening. They show
                  us that it’s possible to live in the moment, grasp
                  lightheartedness, and experience life to its fullest without
                  any regrets or worries about what might be coming. Showcase
                  the particular growth and tone- discovery that can be achieved
                  through solo adventures.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={'/images/inspiring.png'}
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
              <div className="two-col-img ">
                <img
                  src={'/images/onelead.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <h3>Tips and Tricks for Booking One- lead flights</h3>
                </div>
                <p className="heading-description">
                  <b>
                    Give practical tips on chancing affordable one- way flight
                    choices.
                  </b>
                  <br />
                  That can include advice on how to capitalize flight quest
                  machines, what to look for in a ticket, and how to bespeak one
                  way air ticket without breaking the bank. You can again give
                  tips on being cheap flights by using airline bounties programs
                  or reserving through third- party spots like Expedia or Kayak.
                </p>

                <p className="heading-description">
                  Bat the consequence of strictness in trip dates and
                  destinations to secure the swish deals. That can include
                  advice on how to use flight quest machines, what to allow for
                  in a ticket, and how to bespeak one- way flights without
                  surfacing the bank. You can also give tips on chancing cheap
                  flights by capitalizing airline prices programs or reserving
                  through third- party spots like Expedia or Kayak. bat the
                  consequence of strictness in trip dates and destinations to
                  attain the swish deals.
                </p>
                <p className="heading-description">
                  <b>
                    Citation dependable websites or tools for chancing blinked
                    breakouts.
                  </b>
                  <br />
                  You can also give tips on chancing cheap flights by
                  capitalizing airline prices programs or reserving through
                  third- party dapples like Expedia or Kayak. bat the
                  significance of strictness in trip durations and destinations
                  to attain the swish deals. Mention reliable websites or tools
                  for being blinked flights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="oneway-sec">
        <div className="container">
          <div className="two-col-ctnt text-center oneway-ctnt">
            <div className="two-col-hdg text-light" data-aos="fade-left">
              <h3>Prostrating the Fear of the Unknown</h3>
            </div>
            <p className="heading-description text-light my-4">
              Address common enterprises or fears banded with traveling on one-
              way breakouts
              <br />
              You could also address common enterprises or fears associated with
              traveling on one way flight London. For illustration, you might
              account that it’s not as delicate as people suppose to find work
              in another country and that multitudinous employers are willing to
              finance visas for foreign workers. You could also give tips on how
              to close buddies while traveling alone and encourage albums to
              take asset of original resources like CouchsurfingorMeetup.com
            </p>

            <p className="heading-description text-light">
              Offer comforting and advice on embracing the naturalness and query
              of the trip
              <br />
              One- way flights can be a blue-blooded way to travel, but they
              also advance with some risks. For illustration, you might not know
              where you ’re clicking until you get there, and it can be not easy
              to find work in another country if you do n’t have a job lined up
              before leaving home. You could contact these enterprises by
              sacrificing consolation that multitudinous people have
              successfully traveled on one- way flights and set up jobs abroad
              without any interrogatives.
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
                  <h4 className="conclusion-heading">
                    Encourage readers to take the leap and book a one-way flight
                    with confidence.
                  </h4>
                  <p className="conclusion-description">
                    Cheap one way flight London can be a great way to travel,
                    but they also come with some pitfalls. For illustration, you
                    might not know where you ’re going until you get there, and
                    it can be not easy to find work in another country if you do
                    n’t have a job lined up before leaving home. You could
                    address these enterprises by offering consolation that
                    numerous people have successfully traveled on one- way
                    breakouts and set up jobs abroad without any problems.
                    Conclusion Encourage compendiums to take the vault and book
                    a one- way flight with confidence
                  </p>
                  <h4 className="conclusion-heading">
                    Remind them that true fulfillment and growth often lie
                    beyond their comfort zone.
                  </h4>
                  <p className="conclusion-description">
                    You could also give some tips on how to make the utmost of
                    your one- way flight. For illustration, you suggest that
                    compendiums pack light and bring only what they need for
                    their first many weeks in a new country. You could also
                    recommend that they probe original customs and laws before
                    leaving home so that they do n’t accidentally offend anyone
                    or get into trouble once they arrive.
                  </p>
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

