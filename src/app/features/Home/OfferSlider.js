import React, { useEffect, useState } from "react";
import { Get_Offers } from "../../services/Url";
import { get } from "../../services/Service";
import Carousel from "better-react-carousel";
import { ApplyOffer } from "../Coupons/ApplyOffer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const options = {
  loop: true,
  center: false,
  items: 1,
  margin: 15,
  autoplay: false,
  dots: false,
  autoplayTimeout: 8500,
  smartSpeed: 450,
  nav: true,
  responsive: {
    476: {
      items: 1,
    },
    567: {
      items: 2,
    },
    1024: {
      items: 3,
    },
  },
};
const OfferSlider = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    get(Get_Offers, setOffers);
  }, []);

  function Offer() {
    return (
      <Carousel
        cols={3}
        rows={1}
        gap={20}
        loop={true}
        scrollSnap={true}
        autoplay={undefined}
        responsiveLayout={[
          {
            breakpoint: 481,
            cols: 1,
            rows: 1,
            gap: 0,
          },
          {
            breakpoint: 1199,
            cols: 2,
            rows: 1,
            gap: 0,
          },
        ]}
      >
        {offers.length > 0 ? (
          offers?.map((item) => {
            return (
              <Carousel.Item>
                <div className="col-fx-4 cpn-cards" key={item._id}>
                  <ApplyOffer item={item} />
                </div>
              </Carousel.Item>
            );
          })
        ) : (
          <Carousel.Item>
            <div className="col-fx-4 cpn-cards">
              <Skeleton height="200px" />
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    );
  }

  useEffect(() => {
    Offer(offers);
  }, [offers]);

  return (
    <div className="fx-row-copoun mt-3 mb-4 offers-list">
      {offers ? <Offer /> : <Skeleton count={7} />}
    </div>
  );
};

export default OfferSlider;
