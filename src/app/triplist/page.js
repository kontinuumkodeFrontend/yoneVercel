'use client'
import React from "react";
import { InnerBanner } from "../Components/InnerBanner";
import { DataTableComponent } from "../Components/DataTableComponent";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { get } from "../services/Service";
import { Upcoming_Bookings } from "../services/Url";
import moment from 'moment';


const bnrCtnt = {
  heading: "Show Trip Lists",
  description: "A user can send a request to admin with following information.",
  image: '/images/innerPages/innerBanner.jpg',
};
export default function TripList() {
  const [tripList, setTripList] = useState([]);


  useEffect(() => {
    get(Upcoming_Bookings, setTripList)
  }, []);

  const filteredTripData = tripList?.map((trip) => ({
    bookingID: trip._id,
    startDate: moment(trip.trip_start_date).format('DD-MM-YYYY'),
    endDate: moment(trip.trip_end_date).format('DD-MM-YYYY'),
    source: trip.source,
    destination: trip.destination,
    totalAmount: trip.totalTicketAmount ? `$${trip.totalTicketAmount}` : '$0',
    status: trip.status,
  }));

  const columns = [
    {
      name: "bookingID",
      label: "Booking ID",
      options: {
        filter: true,
      },
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        filter: true,
      },
    },
    {
      name: "endDate",
      label: "End Date",
      options: {
        filter: true,
      },
    },
    {
      name: "source",
      label: "Source",
      options: {
        filter: true,
      },
    },
    {
      name: "destination",
      label: "Destination",
      options: {
        filter: true,
      },
    },
    {
      name: "totalAmount",
      label: "Total Amount",
      options: {
        filter: true,
      },
    },
    {
      name: "Action",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const bookingId = tableMeta.rowData[0];
          return (
            <Link href={`/tripstatus/${bookingId}`} className="link-view">
              View
            </Link>
          );
        },
      },
    },
  ];

  return (
    <div className="trip-list-page">
      <InnerBanner content={bnrCtnt} />

      {/* Trip List */}
      <section className="trip-list-sec sec-padding">
        <div className="container">
          <div className="table-bx">
            <DataTableComponent
              name={"Upcoming Bookings"}
              listColumns={columns}
              listData={filteredTripData}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
