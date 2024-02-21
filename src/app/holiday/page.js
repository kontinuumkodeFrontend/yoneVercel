"use client";
import React, { useEffect, useState } from "react";
import { Holiday_Package } from "../services/Url";
import Skeleton from "react-loading-skeleton";
import { InnerBanner } from "../Components/InnerBanner";
import { get } from "../services/Service";
import { PackageCard } from "../features/Package/PackageCard";

const bnrCtnt = {
  heading: "Holiday Packages",
  description:
    "Here user will have the list that will show the following options",
  image: "/images/innerPages/innerBanner.jpg",
};

export default function Holiday() {
  const [holidayData, setHolidayData] = useState([]);

  useEffect(() => {
    get(Holiday_Package, setHolidayData);
  }, []);

  const arr = [1, 1, 1, 1, 1, 1, 1];

  return (
    <div className="package-page">
      <InnerBanner content={bnrCtnt} />
      {/* package cards */}
      <section className="current-trip-sec sec-padding">
        <div className="container">
          <div className="sec-heading">
            <h3>All Packages</h3>
          </div>
          <div className="package-cards">
            {holidayData.length > 0
              ? holidayData?.map((item) => {
                  return <PackageCard key={item._id} item={item} />;
                })
              : arr.map((item, i) => {
                  return (
                    <div className="package-card" key={i}>
                      <div className="package-img"></div>
                      <div className="package-ctnt">
                        <div className="package-body">
                          <div className="package-desc mb-3">
                            <Skeleton height={10} />
                            <Skeleton height={10} />
                            <Skeleton height={10} />
                          </div>
                          <Skeleton height={45} width={100} />
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </div>
  );
}
