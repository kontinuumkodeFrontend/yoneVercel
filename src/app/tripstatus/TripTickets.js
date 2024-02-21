import React from "react";
import Moment from "react-moment";

const TripTickets = ({ flightData, hotelData, activityData, BtnGroups, paid }) => {
    return (
        <div className="col-lg-7">
            {/* flight ticket */}
            {flightData?.length > 0 && (
                <div className="trip-list-wpr">
                    <h4 className="small-heading">Ticket of Flight</h4>
                    <div className="trip-list">
                        {flightData?.map((item) => {
                            return (
                                <div className="trip-list-item" key={item._id}>
                                    <ul>
                                        <li>
                                            <h5>
                                                {item.title}
                                                <span className="time-trip">
                                                    <Moment format="MMM Do YYYY, h:mm a">
                                                        {item.start_date}
                                                    </Moment>{" "}
                                                    <span className="fs-5 fw-bold">|</span>{" "}
                                                    <Moment format="MMM Do YYYY, h:mm a">
                                                        {item.end_date}
                                                    </Moment>
                                                </span>
                                            </h5>
                                            <div className="price">${item.total_amount}</div>
                                        </li>
                                        <li className="flex-column align-items-start">
                                            <div>
                                                <b>
                                                    {item.source} <span>to</span> {item.destination}
                                                </b>
                                                <h4>{item.description}</h4>
                                            </div>
                                            {paid && BtnGroups(item)}
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Accomodation */}
            {hotelData?.length > 0 && (
                <div className="trip-list-wpr mt-md-5 mt-4">
                    <h4 className="small-heading">Ticket of Accommodation</h4>
                    <div className="trip-list">
                        {hotelData?.map((item) => {
                            return (
                                <div className="trip-list-item" key={item._id}>
                                    <ul>
                                        <li>
                                            <h5>
                                                {item.title}
                                                <span className="time-trip">
                                                    <Moment format="MMM Do YYYY, h:mm a">
                                                        {item.start_date}
                                                    </Moment>{" "}
                                                    <span className="fs-5 fw-bold">|</span>{" "}
                                                    <Moment format="MMM Do YYYY, h:mm a">
                                                        {item.end_date}
                                                    </Moment>
                                                </span>
                                            </h5>
                                            <div className="price">${item.total_amount}</div>
                                        </li>
                                        <li className="flex-column align-items-start">
                                            <div>
                                                <h4>{item.description}</h4>
                                            </div>
                                            {paid && BtnGroups(item)}
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {/* activity ticket */}
            {activityData?.length > 0 && (
                <div className="trip-list-wpr mt-md-5 mt-4">
                    <h4 className="small-heading">Ticket of Activities</h4>
                    <div className="trip-list">
                        {activityData?.map((item) => {
                            return (
                                <div className="trip-list-item" key={item._id}>
                                    <ul>
                                        <li>
                                            <h5>
                                                {item.title}
                                                <span className="time-trip">
                                                    <Moment format="MMM Do YYYY, h:mm a">
                                                        {item.start_date}
                                                    </Moment>{" "}
                                                    <span className="fs-5 fw-bold">|</span>{" "}
                                                    <Moment format="MMM Do YYYY, h:mm a">
                                                        {item.end_date}
                                                    </Moment>
                                                </span>
                                            </h5>
                                            <div className="price">${item.total_amount}</div>
                                        </li>
                                        <li className="flex-column align-items-start">
                                            <div>
                                                <h4>{item.description}</h4>
                                            </div>
                                            {paid && BtnGroups(item)}
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripTickets;
