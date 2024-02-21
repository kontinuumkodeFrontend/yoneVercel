"use client";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { popupVisible } from "../../redux/actions/commonAction";
import { POPUP_TYPE } from "../../services/Constants";
import UserContext from "../../context/userContextAPI";
import { modalVisible } from "../../redux/actions/commonAction";
import { MODAL_TYPE } from "../../services/Constants";
import { useRouter } from "next/navigation";
import { IMAGE_BASE } from "@/app/services/Url";

// const ImageBase = process.env.REACT_APP_IMAGE_BASE;
const ImageBase = IMAGE_BASE;

export const ApplyOffer = ({ setOfferID, item, applied, offerName }) => {
  const router = useRouter();
  console.log(router, setOfferID, "router");
  const dispatch = useDispatch();
  // const location = useLocation();
  const ctx = useContext(UserContext);
  const text = item.title;
  const pattern = /(\d+%)/g;
  const highlightedText = text.replace(pattern, "<span>$1</span>");
  const number = text.match(/(\d+)%/);
  const percentageOff = number ? number[1] : "";
  // const { offerId } = useParams();
  let offerId;
  const encodedFileName = encodeURIComponent(item?.cover_image);
  const imageUrl = `url('${ImageBase}coverimage/${encodedFileName}?w=248&fit=crop&auto=format')`;

  return (
    <div
      className="offer-card"
      style={{
        backgroundImage: imageUrl,
      }}
    >
      <div className="offer-detail">
        <div>
          <h4 dangerouslySetInnerHTML={{ __html: highlightedText }}></h4>
          <h6>{item.description}</h6>
        </div>

        {applied ? (
          <div>
            <button className="offer-btn" style={{ cursor: "default" }}>
              Applied
            </button>
          </div>
        ) : (
          <div>
            {location.pathname.includes(offerId) ||
            location.pathname === "/triprequest" ? (
              <button
                className="offer-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setOfferID(item._id);
                  dispatch(popupVisible?.popupOpen(POPUP_TYPE?.OFFER));
                  offerName(`YONE${percentageOff}`);
                }}
              >
                Apply
              </button>
            ) : (
              <button
                className="offer-btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (ctx.isLogin) {
                    router.push(`/triprequest/${item._id}`);
                  } else {
                    dispatch(modalVisible?.modalOpen(MODAL_TYPE?.LOGIN));
                  }
                }}
              >
                Book Now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
