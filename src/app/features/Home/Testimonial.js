"use client";
import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { get } from "../../services/Service";
import { Get_Testimonial, IMAGE_BASE } from "../../services/Url";
import Carousel from "better-react-carousel";
const ImageBase = IMAGE_BASE;

export const Testimonial = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    get(Get_Testimonial, setData);
  }, []);

  // useEffect(() => {
  //   TestimonialData(data);
  // }, [data]);

  return (
    <section className="testimonial-sec sec-padding">
      <div className="container">
        <div className="heading-wrp text-center">
          <span className="sm-heading italic-font after-line center blue ms-0">
            Reviews Testimonials
          </span>
          <h2 className="sub-heading fw-500 mb-lg-5 mb-4">
            Go beyond your imagination
          </h2>
        </div>
        <div className="owl-wpr" data-aos="zoom-in">
          <Carousel
            cols={1}
            rows={1}
            gap={20}
            loop={true}
            scrollSnap={true}
            autoplay={1500}
            infinite={true}
            responsiveLayout={[
              {
                breakpoint: 481,
                cols: 1,
                rows: 1,
                gap: 0,
                loop: true,
                autoplay: 1000,
              },
            ]}
          >
            {data?.map((item) => {
              return (
                <Carousel.Item>
                  <div className="item testimonial-card" key={item._id}>
                    <div className="testimonial-img">
                      <img
                        src={
                          item?.userId?.profile_picture
                            ? ImageBase +
                              "profile/" +
                              item?.userId?.profile_picture
                            : "/images/innerPages/prfPlaceholder.png"
                        }
                        alt="img"
                      />
                    </div>
                    <p className="testimonial-desc">{item.message}</p>
                    <div className="rating">
                      <Rating
                        name="text-feedback"
                        value={item.rating_number}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </div>
                    <div className="testimonial-info">
                      <h4 className="testimonial-name">{item?.userId?.name}</h4>
                      <p className="designation">Customer</p>
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
};
