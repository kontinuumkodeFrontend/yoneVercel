'use client'
import React, { useState, useEffect } from "react";
import { InnerBanner } from "../../Components/InnerBanner";
import { TripInfo } from "../../features/Trip/TripInfo";
import { Feedback } from "../../features/Trip/Feedback";
import {
  ACTIVITY_TICKET,
  FLIGHT_TICKET,
  HOTEL_TICKET,
} from "../../services/Constants";
import {
  Get_Individual_Offer,
  Get_Individual_Trip,
  Get_Rating,
  Get_Ticket_By_User,
} from "../../services/Url";
import { get, post } from "../../services/Service";
import { ApplyOffer } from "../../features/Coupons/ApplyOffer";
import TripTickets from "../../tripstatus/TripTickets";
import TripDetails from "../../tripstatus/TripDetails";
import { BtnGroups } from "@/app/tripstatus/[tripId]/page";

const bnrCtnt = {
  heading: "Show Trip Current Status",
  description:
    "Here user can see the list of current trips and corresponds to that user can see the invoices list.",
  image: '/images/innerPages/innerBanner.jpg',
};

export default function HistoryTripStatus({tripId}){
  const [tripDetails, setTripDetails] = useState();
  const [flightData, setFlightData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [isFeedback, setFeedback] = useState();
  const [offer, setOffer] = useState();
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    //to get trip details
    const url = Get_Individual_Trip + "/" + tripId;
    get(url, setTripDetails);
  }, []);


  useEffect(() => {
    //to get ticket details
    const url = Get_Ticket_By_User + "/" + tripId;
    get(url, setTicket);
  }, [])

  useEffect(() => {
    //api to fetch the user feedback
    const body = JSON.stringify({
      tripid: tripId,
    });
    if (tripDetails?.isRating) {
      post(Get_Rating, body, setFeedback);
    }
  }, [tripId, tripDetails]);

  useEffect(() => {
    if (ticket?.AllTicket?.length > 0) {
      setFlightData(
        ticket?.AllTicket?.filter((item) => item.type === FLIGHT_TICKET)
      );
      setHotelData(
        ticket?.AllTicket?.filter((item) => item.type === HOTEL_TICKET)
      );
      setActivityData(
        ticket?.AllTicket?.filter((item) => item.type === ACTIVITY_TICKET)
      );
    }
  }, [ticket]);

  useEffect(() => {
    if (tripDetails?.offerId) {
      const url = Get_Individual_Offer + "/" + tripDetails?.offerId;
      get(url, setOffer);
    }
  }, [tripDetails]);

  const returnFlights = flightData.filter(
    (item) => item?.return_ticket === true
  );
  const departFlights = flightData.filter(
    (item) => item?.return_ticket === false
  );

  return (
    <div className="show-trip-page">
      <InnerBanner content={bnrCtnt} />
      <TripDetails data={tripDetails} />
      {/* Current Trips */}
      <section className="current-trip-sec sec-padding-bottom">
        <div className="container">
          {(flightData?.length > 0 ||
            hotelData?.length > 0 ||
            activityData?.length > 0) ? (
            <div className="row">
              <TripTickets
                flightData={flightData}
                activityData={activityData}
                hotelData={hotelData}
                BtnGroups={BtnGroups}
                paid={ticket?.paid}
              />
              <div className="col-lg-5">
                <TripInfo
                  returnFlights={returnFlights}
                  departFlights={departFlights}
                  hotelData={hotelData}
                  activityData={activityData}
                  totalAmount={tripDetails?.totalTicketAmount}
                  tripId={tripDetails?.tripId}
                  discount={tripDetails?.discountPercent}
                  payableAmount={tripDetails?.payableAmount}
                  isAllTickets={tripDetails?.isAllTicketAdded}
                  ticketData={ticket}
                />
                <div className="my-4">
                  <div className="col-fx-4 cpn-cards">
                    {offer && (
                      <ApplyOffer
                        item={offer}
                        setOfferID={tripDetails?.offerId}
                        applied={true}
                      />
                    )}
                  </div>
                </div>
                {isFeedback && (
                  <Feedback
                    isFeedback={isFeedback}
                    msg={isFeedback.message}
                    rating={isFeedback.rating_number}
                  />
                )}
              </div>
            </div>
          ) : (<p className="text-md">No tickets added to this trip</p>)}
        </div>
      </section>
    </div>
  );
};
