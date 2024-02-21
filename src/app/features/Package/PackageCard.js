import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { modalVisible, popupVisible } from "../../redux/actions/commonAction";
import { MODAL_TYPE, POPUP_TYPE } from "../../services/Constants";
import { IMAGE_BASE } from "../../services/Url";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UserContext from "@/app/context/userContextAPI";
// import 'react-lazy-load-image-component/src/effects/blur.css';

// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

export const PackageCard = ({ item }) => {
  const dispatch = useDispatch();
  const ctx = useContext(UserContext);
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(modalVisible?.modalOpen(MODAL_TYPE?.LOGIN));

  };


  const chatHandler = (id) => {
    dispatch(popupVisible?.popupOpen(POPUP_TYPE?.HOLIDAY_CHAT));
    ctx.holidayChatHandler(id);
  };

  return (
    <div className="package-card">
      <div className="package-img">
        <LazyLoadImage
          alt='img'
          effect="blur"
          src={
            item?.cover_image
              ? ImageBase + "coverimage/" + item.cover_image
              : '/images/placeholder-bg.png'
          }
        />
      </div>
      <div className="package-ctnt">
        <div className="package-name-wpr">
          <h4>{item.title}</h4>
          <h5 className="package-price">${item.price}</h5>
        </div>
        <div className="package-body">
          <div className="package-desc">
            {item.description}
          </div>
          <div>
            {ctx.isLogin ? (
              <button className="btn btn-design" onClick={() => chatHandler(item._id)}>
                Contact Us
              </button>
            ) : (
              <button className="btn btn-design" onClick={loginHandler}>
                Contact Us
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
