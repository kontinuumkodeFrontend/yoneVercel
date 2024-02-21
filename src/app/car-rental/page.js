'use client'
import React, { useContext } from "react";
import Link from 'next/link'
import { useDispatch } from "react-redux";
import UserContext from "../context/userContextAPI";
import { modalVisible } from "../redux/actions/commonAction";
import { MODAL_TYPE } from "../services/Constants";

const CarRental = () => {
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();

  
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(modalVisible?.modalOpen(MODAL_TYPE?.LOGIN));
  };

  return (
    <div>
      <section className="rethinking-sec text-light">
        <div className="container">
        <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-12">
        <div className="banner-content" data-aos="fade-up">
            <h1 className="banner-heading ">Rethinking Business Travel</h1>
            <p className="rethinking-description">
              Why Car Rentals Are the Way to Go
            </p>
            {(ctx.isLogin ? (
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
        <div className="col-lg-4 col-md-4 col-sm-12"></div>
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
                    Introduce the benefits of renting a car for business trips.
                  </h3>
                </div>
                <p>
                  There are numerous benefits to cheap rental cars for business
                  passages. For one thing, it allows you to stay on the move and
                  get further done. You won’t have to spend time traveling
                  between meetings if you can simply drive from one location to
                  another instead.
                </p>
                <p>
                  It also gives you farther strictness in expressions of where
                  you can go. However, you won’t have to worry about
                  coordinating trip with other people or staying for
                  transportation, If a meeting is listed at an out- point
                  position. fairly, you can just drive yourself there and be
                  ready to work as soon as potential.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img h-100">
                <img
                  src={'/images/renting.png'}
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
                  src={'/images/landscape.png'}
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
                    Highlight the changing landscape of business travel and the
                    need for flexibility
                  </h3>
                </div>
                <p className="heading-description">
                  The world of business travel is changing, and it’s changing
                  fast. With new technologies and trends constantly emerging,
                  it’s harder than ever to keep up with the latest developments
                  in your industry. And that means staying competitive requires
                  a more flexible approach to travel than ever ahead.
                </p>

                <p className="heading-description">
                  That may mean you have to reevaluate the way you travel. And
                  that’s why rent a car are so important. They offer the
                  inflexibility and convenience you need to keep up with
                  moment’s presto- paced business terrain while saving you
                  plutocrat. This composition will bandy how auto settlements
                  can help give your business an edge by adding productivity and
                  lowering costs.
                </p>
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
            <div className="cursiv-heading center blue mb-3">Solutions</div>
            <h2 className="sec-heading">Cost-Effective Solutions</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="rental-car">
                <div className="rentcar-img">
                  <img src={'/images/car-rent.png'} className="img-fluid" alt="img" />
                </div>
                <h4 className="rental-heading">
                  Exploring cheap rental car options for cost-conscious
                  travelers
                </h4>
                <p className="rental-description">
                  still, it’s essential to be as cost-effective as possible, If
                  you ’re traveling for business. While some may suppose
                  cheapest car rental is more precious than taking the train or
                  machine, it does n’t have to be this way. However, you can
                  frequently find better deals than those offered by public
                  transportation services like Amtrak, If you know what kind of
                  rental auto options are available in your area and how
                  important they bring daily.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="rental-car">
                <div className="rentcar-img">
                  <img src={'/images/car-rent.png'} className="img-fluid" alt="img" />
                </div>
                <h4 className="rental-heading">
                  Comparison of car rental prices for budget optimization
                </h4>
                <p className="rental-description">
                  When comparing the price of lowest car rental with the cost of
                  public transportation, it’s essential to consider all factors
                  affecting your overall budget. For illustration, if you ’re
                  traveling overseas and need to rent a auto while on business
                  passages, you may find that buying tickets for trains or
                  motorcars is more precious than renting a vehicle.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="rental-car">
                <div className="rentcar-img">
                  <img src={'/images/car-rent.png'} className="img-fluid" alt="img" />
                </div>
                <h4 className="rental-heading">
                  Finding the cheapest car rental deals without compromising
                  quality
                </h4>
                <p className="rental-description">
                  The best way to find cheap car rental deals without
                  compromising quality is to use a comparison website. These
                  spots let you search multiple companies at formerly to compare
                  prices and get the stylish deal on your coming reimbursement
                  vehicle.
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
                  <div className="after-heading ps-0">
                    Flexible and Convenient
                  </div>
                  <h3>
                    Emphasize the freedom of having your mode of transportation
                  </h3>
                </div>
                <p>
                  You won’t have to worry about coordinating travel with others
                  or waiting for transportation. That can be especially
                  advantageous if you cherish tight deadlines or have to meet
                  specific deadlines. It also gives you additional strictness in
                  terms of where you can go.
                </p>
                <p>
                  Avoiding reliance on public transportation schedules and
                  routes still, you know that detainments can frequently keep
                  you from getting where you need to go on time, If you have
                  ever changed on public transportation. That can make it
                  delicate for people counting on public transportation to get
                  to work every day because they no way know when the coming
                  train will arrive or how long they will be staying.
                </p>
                <p>
                  Still, you can avoid these problems altogether, If you have a
                  auto. You won’t have to worry about what time the train is
                  coming or how long it'll take for one to arrive — you can
                  simply drive yourself there whenever you want to go. That can
                  make it much easier for people who calculate on car rental
                  prices to get where they need to go daily because they do n’t
                  have any other options.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={'/images/emphasize.png'}
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
                  src={'/images/meeting.png'}
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
                    Timely arrival at meetings, conferences, and client visits
                  </h3>
                </div>
                <p className="heading-description">
                  If you’re traveling to a meeting or conference, it can be very
                  frustrating if your train is delayed. You might miss the
                  event's launch and have no idea when you'll arrive at your
                  destination. That can be especially problematic for people who
                  are running late formerly and do n’t want to make their heads
                  indeed more worried than they formerly are.
                </p>

                <p className="heading-description">
                  When you’re traveling for business, it’s essential to arrive
                  on time. That's especially true if you meet with guests, as
                  they will probably be worried if you're late. still, if your
                  train is delayed or canceled, you may not have any other
                  options for getting where you need to go instantly.
                </p>

                <Link href={"#"} className="btn-design">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="oneway-sec">
        <div className="container">
          <div className="two-col-ctnt text-center oneway-ctnt">
            <div className="two-col-hdg text-light" data-aos="fade-left">
              <h3>One-Way Van Rentals for Business Needs:</h3>
            </div>
            <p className="heading-description text-light my-4">
              Discuss the convenience of one-way van rentals for
              business-related transportation of goods and equipment in the UK
              <br />
              The one-way van rental process is simple. All you need to do is
              discuss your needs with a representative from the company who can
              help you select the type of vehicle best suited for your business
              needs.
            </p>

            <p className="heading-description text-light">
              Cost-saving opportunities and flexibility for companies with
              changing operational needs :<br />
              If you’re a company with changing operational needs, one-way van
              rentals can be an excellent way to save money. That is because you
              only pay for the time you use the vehicle, so if your business
              requires a large van for a short period, this is an ideal
              solution.
            </p>
          </div>
        </div>
      </section>
      <section className="two-col-bx reverse sec-padding highlight">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="two-col-img h-100">
                <img
                  src={'/images/comfort.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <h3>Reliability and Comfort</h3>
                </div>
                <div className="comfort-ctnt">
                  <h4 className="rental-heading mt-0">
                    Stress the importance of a comfortable and reliable vehicle
                    for business travel
                  </h4>
                  <p className="rental-description">
                    The vehicle should be in good condition and have a clean
                    innards. It’s also essential that it’s easy to drive and
                    commodious enough to fit your outfit, paperwork, and other
                    materials. However, consider renting a weight van or truck
                    rather of a passenger auto or SUV, If you need help
                    quilting.
                  </p>
                </div>
                <div className="comfort-ctnt">
                  <h4 className="rental-heading mt-0">
                    Benefits of renting a well-maintained vehicle with modern
                    amenities
                  </h4>
                  <p className="rental-description">
                    Provide a list of the benefits that make renting a
                    well-maintained vehicle with modern amenities worthwhile.
                  </p>
                </div>
                <div className="comfort-ctnt">
                  <h4 className="rental-heading mt-0">
                    Creating a professional image with a clean and presentable
                    car
                  </h4>
                  <p className="rental-description">
                    When you travel for business, you want to create a
                    professional image, so your vehicle must be clean and
                    presentable. You should also ensure your equipment is
                    adequately packed and safely secured in the car.
                  </p>
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
                  <div className="after-heading ps-0">
                    Customized Experience
                  </div>
                  <h3>
                    Personalize the business travel experience by selecting a
                    rental car model that suits individual preferences and needs
                  </h3>
                </div>
                <p>
                  You can also add a GPS navigation system to help you navigate
                  strange roads without fussing about getting lost. Convenience
                  Renting a auto is easier than ever thanks to technology — all
                  you need is an internet connection and a many twinkles of your
                  time.
                </p>
                <p>
                  Access to a variety of vehicle types for different business
                  requirements You don’t have to stick with one rental car type;
                  you can choose from various options, including sedans and
                  SUVs. You can also choose from different sizes based on how
                  many people travel in the vehicle.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img ">
                <img
                  src={'/images/experience.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
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
                <div className="two-col-hdg efficient-detail" data-aos="fade-left">
                  <h3>Efficient Time Management</h3>
                  <p>
                    Showcase the time-saving advantages of renting a car for
                    quick and productive travel between locations You can
                    quickly drive between locations without worrying about
                    finding parking or paying for gas. That saves you time and
                    money, especially if you’re a small business with limited
                    resources.
                  </p>
                  <p className="mb-0">
                    Avoiding unnecessary waiting times and delays: You can avoid
                    delays and waiting times by renting a car for quick travel
                    between locations. You won’t have to deal with traffic jams
                    or long lines at the gas pump, so you can get where you need
                    to go much faster.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="efficient-img">
                  <img src={'/images/efficient.png'} alt="img" />
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
              <div className="two-col-img h-100">
                <img
                  src={'/images/availability.png'}
                  className="img-fluid"
                  alt="img"
                  data-aos="flip-right"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-ctnt">
                <div className="two-col-hdg" data-aos="fade-left">
                  <div className="after-heading ps-0">
                    Availability for Young Professionals
                  </div>
                  <h3>
                    Address the common concern of renting a car below the age of
                    25
                  </h3>
                </div>
                <p>
                  Once you come a legal motorist, you may want to explore the
                  world. It can be grueling to plan your first road trip or
                  holiday when you need nearly to go and a auto to do it. To
                  help youthful people find affordable transportation options,
                  numerous rental companies offer abatements on their vehicles
                  for those under 25 times old. These programs are designed
                  specifically for council scholars and other youthful
                  professionals so they can get behind the wheel without
                  breaking the bank.
                </p>
                <p>
                  Highlight UK rental car options for individuals under 25
                  numerous rental auto companies offer abatements for
                  individualities rental car uk under 25$. These programs are
                  designed specifically for council scholars and other youthful
                  professionals so they can get behind the wheel without
                  breaking the bank.
                  <br />
                  Overcoming age restrictions through reliable rental agencies
                  <br />
                  Companies that offer rental cars for individuals under 25
                  typically have age restrictions.
                  <br /> That's because they want to cover their motorists from
                  accidents, liability, and other implicit problems that may
                  arise from inexperienced motorists. still, some agencies will
                  give abatements and special offers for scholars who are under
                  the rent a car in the UK under 25. These programs are designed
                  specifically for council scholars and other youthful
                  professionals so they can get behind the wheel without
                  breaking the bank.
                </p>
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
            <h2 className="sec-heading">Safety and Security</h2>
          </div>
          <div className="test">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="comfort-ctnt" id="cmft-length">
                <img src={'/images/saf&sec1.png'} alt="img" />
                <h4 className="rental-heading mt-0">
                  Highlight the importance of safety features provided in rental
                  cars
                </h4>
                <p className="rental-description">
                  Reimbursement buses are equipped with airbags and anti-lock
                  thickets( ABS). These features help cover you and your
                  passengers in case of an accident. The vehicle will also be
                  gutted and audited before you pick it up so that there are no
                  retired costs or problems.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="comfort-ctnt" id="cmft-length">
                <img src={'/images/saf&sec2.png'} alt="img" />
                <h4 className="rental-heading mt-0">
                  Regular inspections and maintenance for increased reliability
                </h4>
                <p className="rental-description">
                  Rental cars are inspected regularly by a qualified mechanic.
                  That ensures that the auto is in good condition and ready to
                  use. The vehicle will be gutted and maintained by a
                  professional who can fix any problems before you pick it up.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="comfort-ctnt" id="cmft-length">
                <img src={'/images/saf&sec3.png'} alt="img" />
                <h4 className="rental-heading mt-0">
                  Peace of mind while traveling in an unfamiliar city or country
                </h4>
                <p className="rental-description">
                  Traveling can be stressful, especially in an strange megacity
                  or country. You may need to figure out where to go or what to
                  do when you get there. A rental auto allows you to explore
                  while furnishing security and comfort.
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
              <div className="two-col-ctnt">
                <div className="conclusion-ctnt">
                  <h4 className="conclusion-heading">
                    Peace of mind while traveling in an unfamiliar city or
                    country
                  </h4>
                  <p className="conclusion-description">
                    Traveling can be stressful, especially in an strange
                    megacity or country. You may need to figure out where to go
                    or what to do when you get there. A rental auto allows you
                    to explore while furnishing security and comfort.
                  </p>
                  <h4 className="conclusion-heading">
                    Encourage professionals to consider car rentals as a
                    flexible, cost-effective, and reliable solution.
                  </h4>
                  <p className="conclusion-description">
                    Renting a auto for business trip can be salutary for
                    numerous reasons. It provides further freedom to explore the
                    area, allows you to get work done during your trip without
                    fussing about transportation, and helps relieve stress by
                    making you feel more comfortable in an strange place.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="two-col-img h-100">
                <img
                  src={'/images/conclusion.png'}
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

export default CarRental;
