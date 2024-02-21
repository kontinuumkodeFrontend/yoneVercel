import React, { useState, useEffect } from "react";
import Carousel from "better-react-carousel";
import { get } from "../../services/Service";
import { Get_Gallery, IMAGE_BASE } from "../../services/Url";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

const GalleryList = () => {
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    get(Get_Gallery, setGalleryData);
  }, []);

  function Gallery() {
    return (
      <Carousel
        cols={3}
        rows={1}
        gap={15}
        loop={true}
        scrollSnap={true}
        autoplay={undefined}
        responsiveLayout={[
          {
            breakpoint: 320,
            cols: 1,
            rows: 1,
            gap: 0,
          },
          {
            breakpoint: 481,
            cols: 2,
          },
          {
            breakpoint: 768,
            cols: 3,
          },
          {
            breakpoint: 1024,
            cols: 2,
          },
          {
            breakpoint: 1199,
            cols: 2.5,
          },
        ]}
      >
        {galleryData.length > 0 ? (
          galleryData?.map((item) => {
            return (
              <Carousel.Item>
                {" "}
                <div className="our-cust-card" key={item._id}>
                  <LazyLoadImage
                    alt="img"
                    effect="blur"
                    src={
                      item?.cover_image &&
                      `${ImageBase}coverimage/${item?.cover_image}`
                    }
                  />
                </div>
              </Carousel.Item>
            );
          })
        ) : (
          <Carousel.Item>
            <div className="our-cust-card">
              <Skeleton />
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    );
  }

  useEffect(() => {
    Gallery(galleryData);
  }, [galleryData]);

  return (
    <section className="our-customer sec-padding">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <div className="two-col-ctnt">
              <div className="two-col-hdg">
                <div className="after-heading line airoplain">Gallery</div>
                <h3>Our Customer’s Happy Moments</h3>
              </div>
              <p>Discover your ideal experience with us</p>
            </div>
          </div>
          <div className="col-lg-8 pe-lg-0">
            <div className="our-customer-slider">
              <Gallery />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryList;
