import React from "react";
import moment from "moment";

const TripDetails = ({ data }) => {
  const formattedAges = data?.age ? data.age.join(", ") : "";
  const flights = data?.list_of_Preference
    ? data.list_of_Preference[0].flight.join(", ")
    : "";
  const hotels = data?.list_of_Preference
    ? data.list_of_Preference[0].accommodation.join(", ")
    : "";
  const activities = data?.list_of_Preference
    ? data.list_of_Preference[0].activities.join(", ")
    : "";
  const trip = [
    { label: "Booking ID", value: `${data?._id}` },
    { label: "Start Date", value: `${data?.trip_start_date}` },
    { label: "End Date", value: `${data?.trip_end_date}` },
    {
      label: "Number of Passengers",
      value: `${data?.number_of_passenger}`,
    },
    { label: "Age of Passengers", value: formattedAges },
    { label: "Source", value: `${data?.source}` },
    {
      label: "Destination",
      value: `${data?.destination}`,
    },
    {
      label: "Total Amount",
      value: data?.totalTicketAmount ? `$${data?.totalTicketAmount}` : "$0",
    },
    { label: "Flight", value: flights },
    { label: "Accommodation", value: hotels },
    { label: "Activities", value: activities },
    {
      label: "Offer Applied",
      value: data?.offerId ? "Applied" : "Not applied",
    },
  ];

  return (
    <section className="sec-padding">
      <div className="container">
        <div className="trip-detail">
          <h3>Trip Detail</h3>
          <div className="trip-box">
            <ul>
              {trip?.slice(0, 6).map((item, index) => {
                return (
                  <li key={index}>
                    <h6>{item.label}</h6>
                    <div>
                      {item.label === "Start Date" ||
                      item.label === "End Date" ? (
                        <div className="date-field">
                          {item?.value &&
                            moment(item?.value).format("DD/MM/YYYY")}
                        </div>
                      ) : (
                        item.value
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            <ul>
              {trip?.slice(6).map((item, index) => {
                return (
                  <li key={index}>
                    <h6>{item.label}</h6>
                    <div>
                      {item.label === "Start Date" ||
                      item.label === "End Date" ? (
                        <div className="date-field">
                          {item?.value &&
                            moment(item?.value).format("DD/MM/YYYY")}
                        </div>
                      ) : (
                        item.value
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripDetails;
