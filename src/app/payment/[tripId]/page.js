'use client'
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { InnerBanner } from "../../Components/InnerBanner";
import { get } from "../../services/Service";
import { Get_Individual_Trip } from "../../services/Url";
import Moment from "react-moment";
import { usePathname } from 'next/navigation';

const bnrCtnt = {
  heading: "Checkout",
  image: '/images/innerPages/innerBanner.jpg',
  description: "Please review your trip details and proceed to checkout.",
};

// const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const publishableKey = 'pk_test_51LBI2ECjXXVf9ZtEFbjVmqyaOipnfC1xkaAGqBVfTsDk4ryTYd7fDEhDI1cPgA1hTpaBIIfSIpMbyKgWJBGlW0Rr00gQ9gv3Kj';
const stripePromise = loadStripe(publishableKey);

export default function StripeContainer(){
  const pathname = usePathname();

  let pathArr = pathname.split('/')
  let tripId = pathArr[2]




  const [tripDetails, setTripDetails] = useState();
  console.log(tripId, "setTripDetails");

  useEffect(() => {
    const url = Get_Individual_Trip + "/" + tripId;
    get(url, setTripDetails);
  }, []);


  return (
    <div className="payment-gateway">
      <InnerBanner content={bnrCtnt} />
      <div className="container my-md-5 my-3">
        <div className="row">
          <div className="col-lg-6 my-md-5 my-3 px-xl-5 px-4 order-lg-0 order-2">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                tripId={tripDetails?._id}
                amount={tripDetails?.payableAmount}
              />
            </Elements>
          </div>
          <div className="col-lg-6 my-md-5 my-3 px-xl-5 px-4 order-lg-0 order-1">
            <h3 className="order-head">Trip Details</h3>
            <div className="order-summary">
              <div className="d-flex flex-md-row flex-column gap-md-4 gap-2 mb-4">
                <div className="order-img">
                  <img alt="img" src={'/images/flight.png'} />
                </div>
                <div className="ticket-head">
                  <p>
                    {tripDetails?.source} to {tripDetails?.destination}
                  </p>
                  <div>
                    <Moment format="MMM Do YYYY, h:mm a">
                      {tripDetails?.trip_start_date}
                    </Moment>{" "}
                    <span>|</span>{" "}
                    <Moment format="MMM Do YYYY, h:mm a">
                      {tripDetails?.trip_end_date}
                    </Moment>{" "}
                  </div>
                </div>
              </div>
              <div className="trip-pay-info">
                <div className="ticket-amt">
                  <h6>Total Amount</h6>
                  <h5>${tripDetails?.totalTicketAmount}</h5>
                </div>
                <div className="ticket-amt">
                  <h6>Discount</h6>
                  <h5>{tripDetails?.discountPercent}%</h5>
                </div>
                <div className="ticket-amt">
                  <h6>Amount Payable</h6>
                  <h5>${tripDetails?.payableAmount}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

