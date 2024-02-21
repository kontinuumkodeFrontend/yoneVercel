import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { popupVisible } from "../../redux/actions/commonAction";
import {
  POPUP_TYPE,
} from "../../services/Constants";
import { useContext } from "react";
import UserContext from "../../context/userContextAPI";
import { IMAGE_BASE } from "@/app/services/Url";

// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

export const TripInfo = ({
  returnFlights,
  departFlights,
  hotelData,
  activityData,
  totalAmount,
  discount,
  tripId,
  payableAmount,
  isAllTickets,
  ticketData,
}) => {
  const dispatch = useDispatch();
  const ctx = useContext(UserContext);


  return (
    (returnFlights?.length !== 0 ||
      departFlights?.length !== 0 ||
      hotelData?.length !== 0 ||
      activityData?.length !== 0) && (
      <div className="trip-sec">
        <h4 className="small-heading">Information</h4>
        <div className="trip-card">
          <div className="trip-upr">
            {departFlights?.length > 0 && (
              <>
                <div className="trip-info-hdg">
                  <h6>{departFlights[0]?.source}</h6>
                  <div className="flight-icon">
                    <img src={'/images/flight.png'} alt="img" />
                  </div>
                  <h6>{departFlights[0]?.destination}</h6>
                </div>
                <div className="trip-dtl">
                  <div className="blue-txt">Start Date | End Date</div>
                  <div className="time-trip">
                    <Moment format="MMM Do YYYY, h:mm a">
                      {departFlights[0]?.start_date}
                    </Moment>{" "}
                    <span className="fs-5 fw-bold">|</span>{" "}
                    <Moment format="MMM Do YYYY, h:mm a">
                      {departFlights[0]?.end_date}
                    </Moment>
                  </div>
                </div>

                <div className="seprator"></div>
                <div className="service-info">
                  <div className="service-name">Flight</div>
                  {departFlights.map((item) => {
                    return (
                      <div className="service-type" key={item._id}>
                        <span>
                          <img src={'/images/flightSmall.png'} alt="img" />
                        </span>{" "}
                        {item.title}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {hotelData?.length > 0 && (
              <>
                <div className="seprator"></div>
                <div className="service-info">
                  <div className="service-name">Accommodation</div>
                  {hotelData?.map((item) => {
                    return (
                      <div className="service-type" key={item._id}>
                        <span>
                          <img src={'/images/accomodation.png'} alt="img" />
                        </span>{" "}
                        {item.title}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {activityData?.length > 0 && (
              <>
                <div className="seprator"></div>
                <div className="service-info">
                  <div className="service-name">Activities</div>
                  {activityData?.map((item) => {
                    return (
                      <div className="service-type" key={item._id}>
                        <span>
                          <img
                            src={'/images/act-right-arrow.png'}
                            alt="img"
                            className="img-sm"
                          />
                        </span>{" "}
                        {item.title}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="trip-lwr">
            {returnFlights?.length > 0 && (
              <>
                {" "}
                <div className="trip-info-hdg">
                  <h6>{returnFlights[0].source}</h6>
                  <div className="flight-icon">
                    <img src={'/images/flight.png'} alt="img" />
                  </div>
                  <h6>{returnFlights[0].destination}</h6>
                </div>
                <div className="trip-dtl">
                  <div className="blue-txt">Start Date | End Date</div>
                  <div className="time-trip">
                    <Moment format="MMM Do YYYY, h:mm a">
                      {returnFlights[0]?.start_date}
                    </Moment>{" "}
                    <span className="fs-5 fw-bold">|</span>{" "}
                    <Moment format="MMM Do YYYY, h:mm a">
                      {returnFlights[0]?.end_date}
                    </Moment>
                  </div>
                </div>
                <div className="seprator"></div>
                <div className="service-info">
                  <div className="service-name">Flight</div>
                  {returnFlights.map((item) => {
                    return (
                      <div className="service-type" key={item._id}>
                        <span>
                          <img src={'/images/flightSmall.png'} alt="img" />
                        </span>{" "}
                        {item.title}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            <div className="bill-info">
              <h3>
                <span>Total Amount:</span>{" "}
                <span>${totalAmount ? totalAmount : 0} </span>
              </h3>
              {isAllTickets && (
                <>
                  <h3>
                    <span>Discount:</span> <span>{discount ? discount + "%" : '0'}</span>
                  </h3>
                  <h3>
                    <span>Payable Amount:</span> <span>$ {payableAmount}</span>{" "}
                  </h3>
                  <div className="pay-btns btn-group mt-4">
                    <>
                      {/*payment done via card*/}
                      {ticketData?.paid === true &&
                        ticketData?.userpaymnt && (
                          <>
                            <a
                              href={
                                ImageBase +
                                "receipt/" + ticketData?.userpaymnt?.transactionReceipt
                              }
                              download
                              target="_blank"
                              rel="noreferrer"
                              className="btn-design view-btn"
                            >
                              <span>
                                <img src={'/images/innerPages/download.png'} alt="img" />
                              </span>
                              Download Receipt
                            </a>
                            <button
                              className="btn-design approve-btn"
                              style={{ cursor: "default" }}
                            >
                              Paid
                            </button>
                          </>
                        )}

                      {/*Payment is done via bank transfer approved by admin*/}
                      {ticketData?.paid === true &&
                        ticketData?.bankerResult &&
                        ticketData?.bankerResult?.approved === true && (
                          <>
                            <a
                              href={
                                ImageBase +
                                "receipt/" +
                                ticketData.bankerResult?.bank_receipt
                              }
                              download
                              target="_blank"
                              rel="noreferrer"
                              className="btn-design view-btn"
                            >
                              <span>
                                <img src={'/images/innerPages/download.png'} alt="img" />
                              </span>
                              Download Receipt
                            </a>
                            <button
                              className="btn-design approve-btn"
                              style={{ cursor: "default" }}
                            >
                              Approved
                            </button>
                          </>
                        )}

                      {/*Payment is done via bank transfer but yet to be approved by admin*/}
                      {ticketData?.paid === false &&
                        ticketData?.bankerResult && (
                          <>
                            {/*Yet to be approved*/}
                            {ticketData?.bankerResult?.approved === null && (
                              <>
                                <a
                                  href={
                                    ImageBase +
                                    "receipt/" +
                                    ticketData?.bankerResult?.bank_receipt
                                  }
                                  download
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn-design view-btn"
                                >
                                  <span>
                                    <img src={'/images/innerPages/download.png'} alt="img" />
                                  </span>
                                  Download Receipt
                                </a>
                                <button
                                  className="btn-design pro-btn"
                                  style={{ cursor: "default" }}
                                >
                                  In Progress...
                                </button>
                              </>
                            )}
                            {/*Rejected by admin*/}
                            {ticketData?.bankerResult?.approved === false && (
                              <>
                                <button
                                  className="btn-design"
                                  onClick={() => {
                                    ctx.tripDetailsHandler(tripId, payableAmount);
                                    dispatch(
                                      popupVisible?.popupOpen(POPUP_TYPE?.PAYMENT)
                                    );
                                  }}
                                >
                                  Pay Now
                                </button>
                                <button
                                  className="btn-design btn-danger"
                                  style={{ cursor: "default" }}
                                >
                                  Rejected
                                </button>
                              </>
                            )}
                          </>
                        )}

                      {/* Payment Not done yet */}
                      {ticketData?.paid === false &&
                        (ticketData?.userpaymnt === null ||
                          ticketData?.userpaymnt === undefined) &&
                        (ticketData?.bankerResult === null ||
                          ticketData?.bankerResult === undefined) && (
                          <button
                            className="btn-design"
                            onClick={() => {
                              ctx.tripDetailsHandler(tripId, payableAmount);
                              dispatch(
                                popupVisible?.popupOpen(POPUP_TYPE?.PAYMENT)
                              );
                            }}
                          >
                            Pay Now
                          </button>
                        )}
                    </>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
