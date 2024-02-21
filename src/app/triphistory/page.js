'use client'
import React, { useEffect } from "react";
import { InnerBanner } from "../Components/InnerBanner";
import { DataTableComponent } from "../Components/DataTableComponent";
import Link from 'next/link';
import { useState } from "react";
import { History_List } from "../services/Url";
import { get } from "../services/Service";
import moment from 'moment';

const bnrCtnt = {
  heading: "History",
  description:
    "Here user can see the list of previous trips and all the details that were added by admin.",
  image: '/images/innerPages/innerBanner.jpg',
};

export default function TripHistory() {
  const [tripList, setTripList] = useState([]);

  useEffect(() => {
    get(History_List, setTripList)
  }, []);

  const filteredTripData = tripList?.map((trip) => ({
    bookingID: trip._id,
    startDate: moment(trip.trip_start_date).format('DD-MM-YYYY'),
    endDate: moment(trip.trip_end_date).format('DD-MM-YYYY'),
    source: trip.source,
    destination: trip.destination,
    totalAmount: trip?.totalTicketAmount ? `$${trip?.totalTicketAmount}` : '$0',
    status: trip?.status
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
      label: "Total amount",
      options: {
        filter: true,
      },
    },
    {
      name: "status",
      label: "Status",
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
            <Link href={`/triphistorystatus/${bookingId}`} className="link-view">
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
      <section className="trip-list-sec trip-history sec-padding">
        <div className="container">
          <div className="table-bx">
            <DataTableComponent name={"All History"} listColumns={columns}
              listData={filteredTripData} />
          </div>
        </div>
      </section>
    </div>
  );
};
