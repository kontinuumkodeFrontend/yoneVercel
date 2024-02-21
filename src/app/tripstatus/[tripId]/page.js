'use client'
import React, { useState, useEffect, useContext } from "react";
import { InnerBanner } from "../../Components/InnerBanner";
import { TripInfo } from "../../features/Trip/TripInfo";
import { Feedback } from "../../features/Trip/Feedback";
import { popupVisible } from "../../redux/actions/commonAction";
import {
  ACTIVITY_TICKET,
  FLIGHT_TICKET,
  HOTEL_TICKET,
  POPUP_TYPE,
  SUCCESS,
} from "../../services/Constants";
import { useDispatch } from "react-redux";
import {
  Create_Rating,
  Get_Individual_Offer,
  Get_Individual_Trip,
  Get_Rating,
  Get_Ticket_By_User,
  IMAGE_BASE,
} from "../../services/Url";
import { get, post, sendData } from "../../services/Service";
import { toast } from "react-toastify";
import UserContext from "../../context/userContextAPI";
import { ApplyOffer } from "../../features/Coupons/ApplyOffer";
import TripTickets from "../TripTickets";
import TripDetails from "../TripDetails";

// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

const bnrCtnt = {
  heading: "Show Trip Current Status",
  description:
    "Here user can see the list of current trips and corresponds to that user can see the invoices list.",
  image: '/images/innerPages/innerBanner.jpg',
};

export const BtnGroups = (item) => {
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();
  return (
    <div className="btn-group">
      <button
        className="btn-design view-btn"
        onClick={() => {
          ctx.ticketHandler(item.upload_ticket);
          dispatch(popupVisible?.popupOpen(POPUP_TYPE?.TICKET));
        }}
      >
        <span>
          <img src={'/images/innerPages/visibility.png'} alt="img" />
        </span>
        View Ticket
      </button>
      <a
        href={ImageBase + "uploadticket/" + item.upload_ticket}
        download
        target="_blank"
        rel="noreferrer"
        className="btn-design dwn-btn"
      >
        <span>
          <img src={'/images/innerPages/download.png'} alt="img" />
        </span>
        Download Ticket
      </a>
    </div>
  );
};


export default function CurrentTripStatus(Id){
  const dispatch = useDispatch();
  const [tripDetails, setTripDetails] = useState();
  const [flightData, setFlightData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState();
  const [isFeedback, setFeedback] = useState();
  const [ticket, setTicket] = useState([]);
  const [offer, setOffer] = useState();
  const ctx = useContext(UserContext);
  let tripId = Id?.params?.tripId
  console.log(tripId, "tripId");
  useEffect(() => {
    //to get trip details
    const url = Get_Individual_Trip + "/" + tripId;
    get(url, setTripDetails);
  }, [ctx.isFeedback]);

  useEffect(() => {
    //to get ticket details
    const url = Get_Ticket_By_User + "/" + tripId;
    get(url, setTicket);
  }, [ctx.paySuccessHandler, ctx.isFeedback]);

  useEffect(() => {
    //api to fetch the user feedback
    const body = JSON.stringify({
      tripid: tripId,
    });
    if (ticket?.AllTicket?.length > 0 && tripDetails?.isRating === true) {
      post(Get_Rating, body, setFeedback);
    }
  }, [tripId, ticket, tripDetails]);

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

  const userRatingHandler = async () => {
    //feedback API
    const ratingUrl = Create_Rating + "/" + tripId;
    const body = JSON.stringify({
      rating_number: rating,
      message: message,
    });
    const res = await sendData(ratingUrl, body);
    if (res === SUCCESS) {
      toast.success("Rating updated successfully");
      setTimeout(() => {
        dispatch(popupVisible?.popupOpen(POPUP_TYPE?.FEEDBACK));
      }, 800);
      ctx.feedbackHandler();
    }
  };

  const returnFlights = flightData.filter(
    (item) => item.return_ticket === true
  );
  const departFlights = flightData.filter(
    (item) => item.return_ticket === false
  );



  return (
    <div className="show-trip-page">
      <InnerBanner content={bnrCtnt} />
      <TripDetails data={tripDetails} />
      {/* Current Trips */}
      <section className="current-trip-sec sec-padding-bottom">
        <div className="container">
          {flightData?.length > 0 ||
            hotelData?.length > 0 ||
            activityData?.length > 0 ? (
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
                {isFeedback ? (
                  <Feedback
                    isFeedback={isFeedback}
                    msg={isFeedback.message}
                    rating={isFeedback.rating_number}
                  />
                ) : (
                  <Feedback
                    isFeedback={isFeedback}
                    setMessage={setMessage}
                    setRating={setRating}
                    msg={message}
                    rating={rating}
                    feedbackHandler={userRatingHandler}
                  />
                )}
              </div>
            </div>
          ) : (
            <p className="text-md">Your trip request is in progress...</p>
          )}
        </div>
      </section>
    </div>
  );
};
