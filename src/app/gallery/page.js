'use client'
import React from "react";
import { useState } from "react";
import { ACTIVITY, FLIGHT, GALLERY_TABS, HOTEL } from "../services/Constants";
import { useEffect } from "react";
import { get } from "../services/Service";
import { Get_Gallery } from "../services/Url";
import Skeleton from "react-loading-skeleton";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Banner } from "../Components/Banner";
import MasonryImageList from "../features/Gallery/MasnoryGallery";

const bnrCtnt = {
  heading: "Gallery",
  image: '/images/innerPages/Banner.jpg',
  description: "Capture the essence of unforgettable moments with our gallery of trips, hotels, and activities."
};
export default function Gallery() {
  const [tab, setTab] = useState(GALLERY_TABS?.ALL);
  const [data, setData] = useState([]);

  useEffect(() => {
    get(Get_Gallery, setData);
  }, []);

  const flightData = data?.filter((item) => item.category === FLIGHT);
  const hotelData = data?.filter((item) => item.category === HOTEL);
  const activityData = data?.filter((item) => item.category === ACTIVITY);

  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <div className="gallery-page">
      <Banner content={bnrCtnt} />

      {/* Gallery Section */}
      <section className="gallery-sec sec-padding">
        <div className="container">
          <div className="sec-heading-wpr text-center" data-aos="fade-left">
            <div className="cursiv-heading after-line center blue">Gallery</div>
            <h2 className="sec-heading">
              Ready to Get our best Services!
              <br /> Feel free to contact with us
            </h2>
          </div>

          <div className="tab-btns">
            <div
              className={
                tab === GALLERY_TABS?.ALL ? "tab-btn active" : "tab-btn"
              }
              onClick={() => setTab(GALLERY_TABS?.ALL)}
            >
              ALL
            </div>
            <div
              className={
                tab === GALLERY_TABS?.FLIGHT ? "tab-btn active" : "tab-btn"
              }
              onClick={() => setTab(GALLERY_TABS?.FLIGHT)}
            >
              <span>
                <img src={'/images/innerPages/tab1.png'} alt="img" />
              </span>
              Flight
            </div>
            <div
              className={
                tab === GALLERY_TABS?.HOTELS ? "tab-btn active" : "tab-btn"
              }
              onClick={() => setTab(GALLERY_TABS?.HOTELS)}
            >
              <span>
                <img src={'/images/innerPages/tab2.png'} alt="img" />
              </span>
              Hotels
            </div>
            <div
              className={
                tab === GALLERY_TABS?.ACTIVITIES ? "tab-btn active" : "tab-btn"
              }
              onClick={() => setTab(GALLERY_TABS?.ACTIVITIES)}
            >
              <span>
                <img src={'/images/innerPages/tab3.png'} alt="img" />
              </span>
              Activities
            </div>
          </div>
          {data.length > 0 ? (
            <div className="tab-ctnt">
              <div className="container">
                {tab === GALLERY_TABS?.ALL ? (
                  <MasonryImageList galleryList={data} imgNumber={3} />
                ) : tab === GALLERY_TABS?.FLIGHT ? (
                  <MasonryImageList galleryList={flightData} imgNumber={3} />
                ) : tab === GALLERY_TABS?.HOTELS ? (
                  <MasonryImageList galleryList={hotelData} imgNumber={3} />
                ) : tab === GALLERY_TABS?.ACTIVITIES ? (
                  <MasonryImageList galleryList={activityData} imgNumber={3} />
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <ImageList variant="masonry" cols={3} gap={8} className='masnory-list mt-5'>
              {arr.map((item, i) => (
                <ImageListItem key={i}>
                  <Skeleton height={230} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </div>
      </section>
    </div>
  );
};
